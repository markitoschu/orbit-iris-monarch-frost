import { a as object, i as number, n as boolean, o as string, t as array } from "../_libs/zod.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-D8fkrP2l.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_responses_default = "create table if not exists responses (\n  id serial primary key,\n  first_name text not null,\n  live_area text not null,\n  work_area text not null default '',\n  convenient_areas text not null,\n  travel_willingness text not null,\n  preferred_days text not null,\n  preferred_times text not null,\n  time_windows text not null,\n  class_types text not null,\n  frequency text not null,\n  stated_price int not null,\n  commit_price int not null,\n  packages text not null,\n  commitment_style text not null,\n  makeup_valued text not null,\n  studio_priorities text not null,\n  true_yoga_student boolean not null default true,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists responses_live_area_idx on responses (live_area);\ncreate index if not exists responses_created_at_idx on responses (created_at);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_responses.sql": _0002_responses_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
function row(d) {
	return {
		firstName: d.firstName,
		liveArea: d.liveArea,
		workArea: d.workArea ?? "",
		convenientAreas: d.convenientAreas,
		travel: d.travel ?? "nearby",
		preferredDays: d.preferredDays,
		preferredTimes: d.preferredTimes,
		timeWindows: d.timeWindows,
		classTypes: d.classTypes,
		frequency: d.frequency ?? "weekly",
		statedPrice: d.statedPrice,
		commitPrice: d.commitPrice,
		packages: d.packages,
		commitmentStyle: d.commitmentStyle,
		makeup: d.makeup,
		studioPriorities: d.studioPriorities,
		trueYogaStudent: d.trueYogaStudent ?? true
	};
}
var SEED_STUDENTS = [
	row({
		firstName: "Mei",
		liveArea: "tampines",
		workArea: "tanjong_pagar",
		convenientAreas: ["tampines", "bedok"],
		preferredDays: ["fri", "sat"],
		preferredTimes: ["morning"],
		timeWindows: ["0900", "1000"],
		classTypes: ["hatha", "yin"],
		statedPrice: 22,
		commitPrice: 18,
		packages: ["4pack", "8pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"location_home",
			"mrt",
			"price"
		]
	}),
	row({
		firstName: "Priya",
		liveArea: "tampines",
		workArea: "tampines",
		convenientAreas: [
			"tampines",
			"pasir_ris",
			"bedok"
		],
		travel: "same",
		preferredDays: [
			"fri",
			"sat",
			"sun"
		],
		preferredTimes: ["morning", "early"],
		timeWindows: [
			"0730",
			"0900",
			"1000"
		],
		classTypes: [
			"hatha",
			"vinyasa",
			"beginners"
		],
		statedPrice: 20,
		commitPrice: 18,
		packages: ["8pack", "4pack"],
		commitmentStyle: "fixed",
		makeup: "valued",
		studioPriorities: [
			"location_home",
			"small_group",
			"same_slot"
		]
	}),
	row({
		firstName: "Hui Min",
		liveArea: "bedok",
		workArea: "bugis",
		convenientAreas: [
			"bedok",
			"tampines",
			"marine_parade"
		],
		preferredDays: ["sat", "sun"],
		preferredTimes: ["morning"],
		timeWindows: [
			"0900",
			"1000",
			"1100"
		],
		classTypes: ["vinyasa", "hatha"],
		statedPrice: 25,
		commitPrice: 20,
		packages: ["4pack", "monthly"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"mrt",
			"mats",
			"price"
		]
	}),
	row({
		firstName: "Sarah",
		liveArea: "simei",
		workArea: "tanjong_pagar",
		convenientAreas: [
			"tampines",
			"bedok",
			"simei"
		],
		preferredDays: ["fri", "sat"],
		preferredTimes: ["morning"],
		timeWindows: ["0900", "1000"],
		classTypes: [
			"hatha",
			"restorative",
			"yin"
		],
		statedPrice: 22,
		commitPrice: 20,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"location_home",
			"parking",
			"small_group"
		]
	}),
	row({
		firstName: "Farah",
		liveArea: "pasir_ris",
		convenientAreas: ["tampines", "pasir_ris"],
		travel: "nearby",
		preferredDays: ["sat", "sun"],
		preferredTimes: ["morning", "early"],
		timeWindows: [
			"0730",
			"0900",
			"1000"
		],
		classTypes: ["vinyasa", "hatha"],
		statedPrice: 20,
		commitPrice: 18,
		packages: ["4pack", "dropin"],
		commitmentStyle: "flexible",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"price",
			"mats"
		]
	}),
	row({
		firstName: "Rachel",
		liveArea: "tampines",
		workArea: "orchard",
		convenientAreas: ["tampines", "bedok"],
		preferredDays: ["fri"],
		preferredTimes: ["morning"],
		timeWindows: ["0900"],
		classTypes: ["hatha"],
		statedPrice: 18,
		commitPrice: 18,
		packages: ["8pack"],
		commitmentStyle: "fixed",
		makeup: "no",
		studioPriorities: [
			"same_slot",
			"location_home",
			"small_group"
		]
	}),
	row({
		firstName: "Wei Ling",
		liveArea: "bedok",
		convenientAreas: [
			"bedok",
			"marine_parade",
			"tampines"
		],
		preferredDays: [
			"sat",
			"sun",
			"fri"
		],
		preferredTimes: ["morning"],
		timeWindows: [
			"1000",
			"1100",
			"0900"
		],
		classTypes: ["vinyasa", "ashtanga"],
		frequency: "twice",
		statedPrice: 25,
		commitPrice: 22,
		packages: ["monthly", "8pack"],
		commitmentStyle: "monthly",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"size",
			"mats"
		]
	}),
	row({
		firstName: "Joanne",
		liveArea: "tampines",
		convenientAreas: ["tampines"],
		travel: "same",
		preferredDays: ["fri", "wed"],
		preferredTimes: ["morning", "evening"],
		timeWindows: ["0900", "1830"],
		classTypes: [
			"hatha",
			"beginners",
			"yin"
		],
		statedPrice: 20,
		commitPrice: 18,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"location_home",
			"price",
			"parking"
		]
	}),
	row({
		firstName: "Elaine",
		liveArea: "bedok",
		workArea: "tanjong_pagar",
		convenientAreas: [
			"bedok",
			"tampines",
			"tanjong_pagar"
		],
		travel: "island",
		preferredDays: ["sat", "tue"],
		preferredTimes: ["morning", "lunch"],
		timeWindows: ["1000", "1215"],
		classTypes: [
			"vinyasa",
			"hatha",
			"pranayama"
		],
		statedPrice: 25,
		commitPrice: 20,
		packages: ["4pack", "8pack"],
		commitmentStyle: "flexible",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"location_work",
			"mats"
		]
	}),
	row({
		firstName: "Cheryl",
		liveArea: "marine_parade",
		convenientAreas: [
			"bedok",
			"marine_parade",
			"bugis"
		],
		preferredDays: ["sat", "sun"],
		preferredTimes: ["morning"],
		timeWindows: ["0900", "1000"],
		classTypes: [
			"yin",
			"hatha",
			"restorative"
		],
		statedPrice: 22,
		commitPrice: 20,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"small_group",
			"mats"
		]
	}),
	row({
		firstName: "Nicole",
		liveArea: "tampines",
		convenientAreas: [
			"tampines",
			"bedok",
			"simei"
		],
		preferredDays: [
			"fri",
			"sat",
			"sun"
		],
		preferredTimes: ["morning", "early"],
		timeWindows: [
			"0730",
			"0900",
			"1000"
		],
		classTypes: [
			"hatha",
			"vinyasa",
			"therapy"
		],
		frequency: "twice",
		statedPrice: 25,
		commitPrice: 22,
		packages: ["8pack", "monthly"],
		commitmentStyle: "fixed",
		makeup: "no",
		studioPriorities: [
			"same_slot",
			"small_group",
			"location_home"
		]
	}),
	row({
		firstName: "Amanda",
		liveArea: "pasir_ris",
		convenientAreas: [
			"tampines",
			"pasir_ris",
			"bedok"
		],
		preferredDays: ["sat"],
		preferredTimes: ["morning"],
		timeWindows: ["1000", "1100"],
		classTypes: ["vinyasa", "beginners"],
		frequency: "occasional",
		statedPrice: 18,
		commitPrice: 15,
		packages: ["dropin"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"price",
			"parking",
			"mrt"
		],
		trueYogaStudent: false
	}),
	row({
		firstName: "Grace",
		liveArea: "simei",
		convenientAreas: ["tampines", "bedok"],
		preferredDays: ["fri", "sat"],
		preferredTimes: ["morning"],
		timeWindows: ["0900", "1000"],
		classTypes: ["hatha", "yin"],
		statedPrice: 20,
		commitPrice: 18,
		packages: ["8pack", "4pack"],
		commitmentStyle: "fixed",
		makeup: "valued",
		studioPriorities: [
			"location_home",
			"same_slot",
			"price"
		]
	}),
	row({
		firstName: "Lynn",
		liveArea: "tampines",
		workArea: "bugis",
		convenientAreas: ["tampines", "bugis"],
		preferredDays: ["fri", "wed"],
		preferredTimes: ["morning", "lunch"],
		timeWindows: ["0900", "1215"],
		classTypes: ["hatha", "pranayama"],
		statedPrice: 22,
		commitPrice: 18,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"location_home",
			"location_work",
			"mrt"
		]
	}),
	row({
		firstName: "Stephanie",
		liveArea: "bedok",
		convenientAreas: ["bedok", "tampines"],
		preferredDays: [
			"sat",
			"sun",
			"fri"
		],
		preferredTimes: ["morning"],
		timeWindows: [
			"0900",
			"1000",
			"1100"
		],
		classTypes: [
			"vinyasa",
			"hatha",
			"yin"
		],
		statedPrice: 22,
		commitPrice: 20,
		packages: ["4pack", "8pack"],
		commitmentStyle: "flexible",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"small_group",
			"price"
		]
	}),
	row({
		firstName: "Adeline",
		liveArea: "tampines",
		convenientAreas: ["tampines", "bedok"],
		preferredDays: ["sat"],
		preferredTimes: ["morning", "early"],
		timeWindows: [
			"0730",
			"0900",
			"1000"
		],
		classTypes: [
			"vinyasa",
			"ashtanga",
			"hatha"
		],
		frequency: "weekly",
		statedPrice: 25,
		commitPrice: 22,
		packages: ["8pack"],
		commitmentStyle: "fixed",
		makeup: "no",
		studioPriorities: [
			"small_group",
			"mats",
			"mrt"
		]
	}),
	row({
		firstName: "Ananya",
		liveArea: "amk",
		workArea: "amk",
		convenientAreas: [
			"amk",
			"bishan",
			"serangoon"
		],
		preferredDays: ["tue", "thu"],
		preferredTimes: ["evening"],
		timeWindows: ["1830", "1930"],
		classTypes: [
			"therapy",
			"hatha",
			"yin"
		],
		frequency: "weekly",
		statedPrice: 28,
		commitPrice: 25,
		packages: ["8pack"],
		commitmentStyle: "fixed",
		makeup: "valued",
		studioPriorities: [
			"same_slot",
			"small_group",
			"location_home"
		]
	}),
	row({
		firstName: "Deepa",
		liveArea: "serangoon",
		convenientAreas: [
			"serangoon",
			"amk",
			"hougang"
		],
		preferredDays: [
			"tue",
			"thu",
			"sat"
		],
		preferredTimes: ["evening", "morning"],
		timeWindows: [
			"1930",
			"1830",
			"1000"
		],
		classTypes: [
			"therapy",
			"yin",
			"restorative"
		],
		statedPrice: 25,
		commitPrice: 22,
		packages: ["8pack", "4pack"],
		commitmentStyle: "fixed",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"small_group",
			"mats"
		]
	}),
	row({
		firstName: "Kavitha",
		liveArea: "hougang",
		convenientAreas: [
			"hougang",
			"serangoon",
			"amk"
		],
		preferredDays: [
			"mon",
			"wed",
			"thu"
		],
		preferredTimes: ["evening"],
		timeWindows: ["1930", "1830"],
		classTypes: ["therapy", "hatha"],
		statedPrice: 25,
		commitPrice: 22,
		packages: ["8pack"],
		commitmentStyle: "fixed",
		makeup: "no",
		studioPriorities: [
			"location_home",
			"same_slot",
			"parking"
		]
	}),
	row({
		firstName: "Lakshmi",
		liveArea: "bishan",
		workArea: "novena",
		convenientAreas: [
			"bishan",
			"amk",
			"novena",
			"serangoon"
		],
		preferredDays: ["tue", "thu"],
		preferredTimes: ["evening"],
		timeWindows: ["1830", "1930"],
		classTypes: [
			"therapy",
			"hatha",
			"pranayama"
		],
		statedPrice: 28,
		commitPrice: 25,
		packages: ["8pack", "monthly"],
		commitmentStyle: "fixed",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"small_group",
			"location_work"
		]
	}),
	row({
		firstName: "Siti",
		liveArea: "punggol",
		convenientAreas: [
			"punggol",
			"hougang",
			"serangoon"
		],
		preferredDays: [
			"wed",
			"thu",
			"sat"
		],
		preferredTimes: ["evening", "morning"],
		timeWindows: ["1930", "1000"],
		classTypes: [
			"hatha",
			"yin",
			"beginners"
		],
		statedPrice: 20,
		commitPrice: 18,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"mrt",
			"price",
			"location_home"
		]
	}),
	row({
		firstName: "Nadia",
		liveArea: "amk",
		convenientAreas: ["amk", "bishan"],
		travel: "same",
		preferredDays: [
			"tue",
			"thu",
			"sun"
		],
		preferredTimes: ["evening"],
		timeWindows: ["1830", "1930"],
		classTypes: [
			"therapy",
			"restorative",
			"yin"
		],
		statedPrice: 25,
		commitPrice: 22,
		packages: ["8pack", "4pack"],
		commitmentStyle: "fixed",
		makeup: "valued",
		studioPriorities: [
			"location_home",
			"same_slot",
			"mats"
		]
	}),
	row({
		firstName: "Hannah",
		liveArea: "serangoon",
		workArea: "bugis",
		convenientAreas: [
			"serangoon",
			"amk",
			"bugis"
		],
		preferredDays: ["tue", "wed"],
		preferredTimes: ["evening"],
		timeWindows: ["1930"],
		classTypes: ["therapy", "vinyasa"],
		statedPrice: 22,
		commitPrice: 20,
		packages: ["4pack", "8pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"mrt",
			"price",
			"small_group"
		]
	}),
	row({
		firstName: "Jasmine",
		liveArea: "amk",
		convenientAreas: [
			"amk",
			"serangoon",
			"bishan"
		],
		preferredDays: [
			"mon",
			"tue",
			"thu"
		],
		preferredTimes: ["evening"],
		timeWindows: ["1830", "1930"],
		classTypes: [
			"hatha",
			"therapy",
			"beginners"
		],
		frequency: "twice",
		statedPrice: 22,
		commitPrice: 20,
		packages: ["monthly", "8pack"],
		commitmentStyle: "monthly",
		makeup: "valued",
		studioPriorities: [
			"location_home",
			"small_group",
			"mrt"
		]
	}),
	row({
		firstName: "Esther",
		liveArea: "bishan",
		convenientAreas: [
			"bishan",
			"amk",
			"novena"
		],
		preferredDays: ["tue", "thu"],
		preferredTimes: ["evening"],
		timeWindows: ["1930", "1830"],
		classTypes: ["therapy", "yin"],
		statedPrice: 25,
		commitPrice: 22,
		packages: ["8pack"],
		commitmentStyle: "fixed",
		makeup: "no",
		studioPriorities: [
			"same_slot",
			"parking",
			"small_group"
		]
	}),
	row({
		firstName: "Rina",
		liveArea: "hougang",
		convenientAreas: [
			"hougang",
			"serangoon",
			"amk"
		],
		preferredDays: ["thu", "sat"],
		preferredTimes: ["evening", "morning"],
		timeWindows: ["1930", "0900"],
		classTypes: [
			"hatha",
			"vinyasa",
			"therapy"
		],
		statedPrice: 20,
		commitPrice: 18,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"price",
			"mrt",
			"location_home"
		]
	}),
	row({
		firstName: "Priyanka",
		liveArea: "serangoon",
		convenientAreas: ["serangoon", "amk"],
		preferredDays: [
			"tue",
			"thu",
			"sun"
		],
		preferredTimes: ["evening"],
		timeWindows: ["1830", "1930"],
		classTypes: [
			"therapy",
			"hatha",
			"pranayama"
		],
		statedPrice: 28,
		commitPrice: 25,
		packages: ["8pack", "private"],
		commitmentStyle: "fixed",
		makeup: "valued",
		studioPriorities: [
			"small_group",
			"same_slot",
			"mats"
		]
	}),
	row({
		firstName: "Daniel",
		liveArea: "tanjong_pagar",
		workArea: "tanjong_pagar",
		convenientAreas: [
			"tanjong_pagar",
			"chinatown",
			"bugis"
		],
		travel: "same",
		preferredDays: [
			"tue",
			"thu",
			"sat"
		],
		preferredTimes: ["lunch", "early"],
		timeWindows: ["1215", "0730"],
		classTypes: ["ashtanga", "vinyasa"],
		frequency: "twice",
		statedPrice: 30,
		commitPrice: 25,
		packages: ["monthly", "8pack"],
		commitmentStyle: "monthly",
		makeup: "valued",
		studioPriorities: [
			"location_work",
			"mrt",
			"size"
		]
	}),
	row({
		firstName: "Marcus",
		liveArea: "novena",
		workArea: "orchard",
		convenientAreas: [
			"novena",
			"orchard",
			"bugis"
		],
		preferredDays: [
			"mon",
			"wed",
			"sat"
		],
		preferredTimes: ["lunch", "early"],
		timeWindows: [
			"1215",
			"0630",
			"0730"
		],
		classTypes: [
			"ashtanga",
			"vinyasa",
			"pranayama"
		],
		frequency: "few",
		statedPrice: 30,
		commitPrice: 28,
		packages: ["monthly"],
		commitmentStyle: "monthly",
		makeup: "no",
		studioPriorities: [
			"location_work",
			"mrt",
			"mats"
		]
	}),
	row({
		firstName: "Ben",
		liveArea: "bugis",
		workArea: "bugis",
		convenientAreas: [
			"bugis",
			"chinatown",
			"tanjong_pagar"
		],
		preferredDays: [
			"wed",
			"fri",
			"sat"
		],
		preferredTimes: ["lunch", "morning"],
		timeWindows: ["1215", "0730"],
		classTypes: [
			"vinyasa",
			"ashtanga",
			"hatha"
		],
		statedPrice: 25,
		commitPrice: 22,
		packages: ["4pack", "8pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"mrt",
			"location_work",
			"price"
		]
	}),
	row({
		firstName: "Arun",
		liveArea: "chinatown",
		workArea: "tanjong_pagar",
		convenientAreas: [
			"chinatown",
			"tanjong_pagar",
			"bugis"
		],
		preferredDays: [
			"tue",
			"thu",
			"sat"
		],
		preferredTimes: ["lunch", "early"],
		timeWindows: ["1215", "0630"],
		classTypes: ["ashtanga"],
		statedPrice: 28,
		commitPrice: 25,
		packages: ["8pack", "monthly"],
		commitmentStyle: "fixed",
		makeup: "no",
		studioPriorities: [
			"same_slot",
			"mrt",
			"small_group"
		]
	}),
	row({
		firstName: "Catherine",
		liveArea: "orchard",
		workArea: "orchard",
		convenientAreas: [
			"orchard",
			"novena",
			"bugis"
		],
		preferredDays: ["sat", "sun"],
		preferredTimes: ["morning", "early"],
		timeWindows: ["0730", "0900"],
		classTypes: [
			"vinyasa",
			"ashtanga",
			"yin"
		],
		statedPrice: 28,
		commitPrice: 22,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"mats",
			"size"
		]
	}),
	row({
		firstName: "Ken",
		liveArea: "tanjong_pagar",
		workArea: "tanjong_pagar",
		convenientAreas: ["tanjong_pagar", "bugis"],
		preferredDays: [
			"mon",
			"wed",
			"fri"
		],
		preferredTimes: ["lunch"],
		timeWindows: ["1215"],
		classTypes: ["vinyasa", "hatha"],
		frequency: "weekly",
		statedPrice: 25,
		commitPrice: 22,
		packages: ["4pack", "dropin"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"location_work",
			"mrt",
			"price"
		]
	}),
	row({
		firstName: "Michelle",
		liveArea: "novena",
		convenientAreas: [
			"novena",
			"bishan",
			"orchard"
		],
		preferredDays: ["sat", "sun"],
		preferredTimes: ["morning"],
		timeWindows: ["0900", "1000"],
		classTypes: [
			"yin",
			"restorative",
			"hatha"
		],
		statedPrice: 25,
		commitPrice: 20,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"small_group",
			"mats"
		]
	}),
	row({
		firstName: "Vishal",
		liveArea: "bugis",
		workArea: "tanjong_pagar",
		convenientAreas: [
			"bugis",
			"tanjong_pagar",
			"chinatown"
		],
		preferredDays: ["sat"],
		preferredTimes: ["early", "morning"],
		timeWindows: [
			"0630",
			"0730",
			"0900"
		],
		classTypes: ["ashtanga", "vinyasa"],
		statedPrice: 30,
		commitPrice: 25,
		packages: ["8pack"],
		commitmentStyle: "fixed",
		makeup: "no",
		studioPriorities: [
			"same_slot",
			"mrt",
			"small_group"
		]
	}),
	row({
		firstName: "Tom",
		liveArea: "tanjong_pagar",
		workArea: "tanjong_pagar",
		convenientAreas: ["tanjong_pagar"],
		travel: "same",
		preferredDays: ["tue", "thu"],
		preferredTimes: ["lunch"],
		timeWindows: ["1215"],
		classTypes: ["vinyasa", "ashtanga"],
		frequency: "occasional",
		statedPrice: 22,
		commitPrice: 18,
		packages: ["dropin"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: ["location_work", "price"],
		trueYogaStudent: false
	}),
	row({
		firstName: "Xin Yi",
		liveArea: "tampines",
		workArea: "novena",
		convenientAreas: [
			"tampines",
			"novena",
			"amk"
		],
		travel: "island",
		preferredDays: ["tue", "sat"],
		preferredTimes: ["evening", "morning"],
		timeWindows: ["1930", "1000"],
		classTypes: [
			"hatha",
			"therapy",
			"yin"
		],
		statedPrice: 25,
		commitPrice: 22,
		packages: ["8pack", "4pack"],
		commitmentStyle: "flexible",
		makeup: "valued",
		studioPriorities: [
			"small_group",
			"mrt",
			"same_slot"
		]
	}),
	row({
		firstName: "Yasmin",
		liveArea: "bedok",
		workArea: "orchard",
		convenientAreas: [
			"bedok",
			"bugis",
			"orchard"
		],
		travel: "island",
		preferredDays: ["sat", "wed"],
		preferredTimes: ["morning", "lunch"],
		timeWindows: ["1000", "1215"],
		classTypes: ["vinyasa", "pranayama"],
		statedPrice: 25,
		commitPrice: 20,
		packages: ["monthly", "4pack"],
		commitmentStyle: "monthly",
		makeup: "valued",
		studioPriorities: [
			"mrt",
			"mats",
			"location_work"
		]
	}),
	row({
		firstName: "Fiona",
		liveArea: "serangoon",
		convenientAreas: [
			"serangoon",
			"bugis",
			"amk"
		],
		travel: "island",
		preferredDays: ["sat", "sun"],
		preferredTimes: ["morning"],
		timeWindows: ["0900", "1000"],
		classTypes: [
			"hatha",
			"vinyasa",
			"beginners"
		],
		statedPrice: 20,
		commitPrice: 18,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"mrt",
			"price",
			"small_group"
		],
		trueYogaStudent: false
	}),
	row({
		firstName: "Sharon",
		liveArea: "amk",
		convenientAreas: ["amk", "tampines"],
		travel: "island",
		preferredDays: ["fri", "sat"],
		preferredTimes: ["morning"],
		timeWindows: ["0900", "1000"],
		classTypes: ["hatha", "yin"],
		statedPrice: 22,
		commitPrice: 18,
		packages: ["4pack", "8pack"],
		commitmentStyle: "flexible",
		makeup: "valued",
		studioPriorities: [
			"small_group",
			"price",
			"mrt"
		]
	}),
	row({
		firstName: "Li Wei",
		liveArea: "bishan",
		workArea: "tanjong_pagar",
		convenientAreas: [
			"bishan",
			"tanjong_pagar",
			"novena"
		],
		travel: "nearby",
		preferredDays: ["wed", "sat"],
		preferredTimes: ["lunch", "morning"],
		timeWindows: ["1215", "0900"],
		classTypes: ["vinyasa", "hatha"],
		statedPrice: 22,
		commitPrice: 20,
		packages: ["4pack"],
		commitmentStyle: "flexible",
		makeup: "essential",
		studioPriorities: [
			"location_work",
			"mrt",
			"price"
		]
	}),
	row({
		firstName: "Raj",
		liveArea: "hougang",
		convenientAreas: [
			"hougang",
			"serangoon",
			"amk"
		],
		preferredDays: ["sat", "sun"],
		preferredTimes: ["early", "morning"],
		timeWindows: ["0730", "0900"],
		classTypes: ["ashtanga", "vinyasa"],
		statedPrice: 22,
		commitPrice: 20,
		packages: ["8pack"],
		commitmentStyle: "fixed",
		makeup: "no",
		studioPriorities: [
			"same_slot",
			"parking",
			"small_group"
		]
	})
];
var surveySchema = object({
	firstName: string().trim().min(1).max(40),
	liveArea: string().min(1),
	workArea: string(),
	convenientAreas: array(string()).min(1),
	travel: string().min(1),
	preferredDays: array(string()).min(1),
	preferredTimes: array(string()).min(1),
	timeWindows: array(string()).min(1),
	classTypes: array(string()).min(1),
	frequency: string().min(1),
	statedPrice: number().int().min(10).max(80),
	commitPrice: number().int().min(10).max(80),
	packages: array(string()).min(1),
	commitmentStyle: string().min(1),
	makeup: string().min(1),
	studioPriorities: array(string()).min(1).max(3),
	trueYogaStudent: boolean()
});
function parseJson(value, fallback) {
	try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
}
function parseRow(row) {
	return {
		id: Number(row.id),
		firstName: row.first_name,
		liveArea: row.live_area,
		workArea: row.work_area || "",
		convenientAreas: parseJson(row.convenient_areas, []),
		travel: row.travel_willingness,
		preferredDays: parseJson(row.preferred_days, []),
		preferredTimes: parseJson(row.preferred_times, []),
		timeWindows: parseJson(row.time_windows, []),
		classTypes: parseJson(row.class_types, []),
		frequency: row.frequency,
		statedPrice: Number(row.stated_price),
		commitPrice: Number(row.commit_price),
		packages: parseJson(row.packages, []),
		commitmentStyle: row.commitment_style,
		makeup: row.makeup_valued,
		studioPriorities: parseJson(row.studio_priorities, []),
		trueYogaStudent: Boolean(row.true_yoga_student),
		createdAt: String(row.created_at)
	};
}
async function insertStudent(sql, data) {
	const rows = await sql`
    insert into responses (
      first_name, live_area, work_area, convenient_areas, travel_willingness,
      preferred_days, preferred_times, time_windows, class_types, frequency,
      stated_price, commit_price, packages, commitment_style, makeup_valued,
      studio_priorities, true_yoga_student
    ) values (
      ${data.firstName},
      ${data.liveArea},
      ${data.workArea},
      ${JSON.stringify(data.convenientAreas)},
      ${data.travel},
      ${JSON.stringify(data.preferredDays)},
      ${JSON.stringify(data.preferredTimes)},
      ${JSON.stringify(data.timeWindows)},
      ${JSON.stringify(data.classTypes)},
      ${data.frequency},
      ${data.statedPrice},
      ${data.commitPrice},
      ${JSON.stringify(data.packages)},
      ${data.commitmentStyle},
      ${data.makeup},
      ${JSON.stringify(data.studioPriorities)},
      ${data.trueYogaStudent}
    )
    returning id
  `;
	return Number(rows[0]?.id ?? 0);
}
async function ensureSeed(sql) {
	const counted = await sql`select count(*)::int as n from responses`;
	if (Number(counted[0]?.n ?? 0) > 0) return;
	for (const student of SEED_STUDENTS) await insertStudent(sql, student);
}
var listResponses_createServerFn_handler = createServerRpc({
	id: "8d3cfe6ab277d3b4826cfc4c31f6948de0cca91644278a3f5772e5a529d06e7a",
	name: "listResponses",
	filename: "src/lib/nila/server.ts"
}, (opts) => listResponses.__executeServer(opts));
var listResponses = createServerFn({ method: "GET" }).handler(listResponses_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeed(sql);
	return (await sql`select * from responses order by id asc`).map(parseRow);
});
var submitResponse_createServerFn_handler = createServerRpc({
	id: "fbc51cc29b21ba506427eaf95ca37adc7f9a72b27a2b1db192f4df9de0b56069",
	name: "submitResponse",
	filename: "src/lib/nila/server.ts"
}, (opts) => submitResponse.__executeServer(opts));
var submitResponse = createServerFn({ method: "POST" }).validator((data) => surveySchema.parse(data)).handler(submitResponse_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensureSeed(sql);
	const id = await insertStudent(sql, data);
	const counted = await sql`select count(*)::int as n from responses`;
	return {
		id,
		total: Number(counted[0]?.n ?? 0)
	};
});
//#endregion
export { listResponses_createServerFn_handler, submitResponse_createServerFn_handler };
