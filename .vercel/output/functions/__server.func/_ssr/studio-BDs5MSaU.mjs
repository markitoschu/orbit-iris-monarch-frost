import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as MapPin, r as Copy } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { C as listResponses, S as labelOf, a as Button, b as cn, c as DAYS, d as HUBS, f as Input, i as AppShell, l as DEFAULT_SETTINGS, n as AREAS, o as CLASS_TYPES, p as Label, r as AREA_BY_ID, t as ADJACENT, v as TIME_WINDOWS, x as formatSgd } from "./server-DVS4XdK2.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-BDs5MSaU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChartFrame({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 rounded-lg bg-muted/60" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full",
		children
	});
}
var tooltipStyle = {
	background: "var(--color-card)",
	border: "1px solid var(--color-border)",
	borderRadius: 8,
	fontSize: 12,
	color: "var(--color-foreground)"
};
function AreaBars({ data }) {
	const rows = data.filter((d) => d.live > 0 || d.convenient > 0).map((d) => ({
		name: AREA_BY_ID[d.area]?.label ?? d.area,
		live: d.live,
		convenient: d.convenient
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
		data: rows,
		margin: {
			top: 8,
			right: 8,
			left: -16,
			bottom: 0
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
				stroke: "var(--color-border)",
				vertical: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
				dataKey: "name",
				tick: {
					fontSize: 11,
					fill: "var(--color-muted-foreground)"
				},
				interval: 0,
				angle: -25,
				textAnchor: "end",
				height: 56
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
				allowDecimals: false,
				tick: {
					fontSize: 11,
					fill: "var(--color-muted-foreground)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
				dataKey: "live",
				name: "Live here",
				fill: "var(--color-primary)",
				radius: [
					4,
					4,
					0,
					0
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
				dataKey: "convenient",
				name: "Would attend here",
				fill: "var(--color-chart-2)",
				radius: [
					4,
					4,
					0,
					0
				]
			})
		]
	}) }) });
}
function ClassBars({ data }) {
	const rows = data.map((d) => ({
		name: labelOf(CLASS_TYPES, d.id),
		count: d.count
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
		data: rows,
		layout: "vertical",
		margin: {
			top: 8,
			right: 12,
			left: 16,
			bottom: 0
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
				stroke: "var(--color-border)",
				horizontal: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
				type: "number",
				allowDecimals: false,
				tick: {
					fontSize: 11,
					fill: "var(--color-muted-foreground)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
				type: "category",
				dataKey: "name",
				width: 108,
				tick: {
					fontSize: 11,
					fill: "var(--color-muted-foreground)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
				dataKey: "count",
				name: "Interested",
				fill: "var(--color-primary)",
				radius: [
					0,
					4,
					4,
					0
				]
			})
		]
	}) }) });
}
function PriceBars({ data }) {
	const rows = data.map((d) => ({
		name: `S$${d.price}`,
		commit: d.overallCommit,
		stated: d.overallStated
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
		data: rows,
		margin: {
			top: 8,
			right: 8,
			left: -16,
			bottom: 0
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
				stroke: "var(--color-border)",
				vertical: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
				dataKey: "name",
				tick: {
					fontSize: 11,
					fill: "var(--color-muted-foreground)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
				allowDecimals: false,
				tick: {
					fontSize: 11,
					fill: "var(--color-muted-foreground)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
				dataKey: "stated",
				name: "Say they’d pay",
				fill: "var(--color-chart-2)",
				radius: [
					4,
					4,
					0,
					0
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
				dataKey: "commit",
				name: "Would actually pay",
				fill: "var(--color-primary)",
				radius: [
					4,
					4,
					0,
					0
				]
			})
		]
	}) }) });
}
function Heatmap({ cells, onPick }) {
	const max = Math.max(1, ...cells.map((c) => c.count));
	const lookup = new Map(cells.map((c) => [`${c.day}-${c.window}`, c.count]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[32rem] border-separate border-spacing-1 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "w-24 text-left text-xs font-medium text-muted-foreground",
				children: " "
			}), DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "text-xs font-medium text-muted-foreground",
				children: d.short
			}, d.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: TIME_WINDOWS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "whitespace-nowrap pr-2 text-xs text-muted-foreground",
				children: w.label
			}), DAYS.map((d) => {
				const count = lookup.get(`${d.id}-${w.id}`) ?? 0;
				const intensity = count / max;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onPick?.(d.id, w.id),
					className: cn("flex h-10 w-full items-center justify-center rounded-md text-xs tabular-nums transition-transform duration-150", count === 0 ? "bg-muted text-muted-foreground" : "text-primary-foreground"),
					style: count === 0 ? void 0 : { backgroundColor: `color-mix(in oklab, var(--color-primary) ${Math.round(25 + intensity * 75)}%, transparent)` },
					children: count || "·"
				}) }, d.id);
			})] }, w.id)) })]
		})
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground",
		outline: "border border-border text-foreground",
		sage: "bg-sage-soft text-accent-foreground",
		muted: "bg-muted text-muted-foreground",
		warn: "bg-warn-soft text-warn"
	} },
	defaultVariants: { variant: "muted" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-card text-card-foreground shadow-card", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 p-5 pb-0", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-display text-lg font-medium tracking-tight", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5", className),
		...props
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-5 rounded-full border border-primary bg-card shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" })]
	});
}
function areaReachable(student, hub) {
	if (student.convenientAreas.includes(hub)) return true;
	if (student.liveArea === hub || student.workArea === hub) return true;
	if (student.travel === "same") return false;
	if (student.travel === "nearby") {
		const near = /* @__PURE__ */ new Set([student.liveArea, ...ADJACENT[student.liveArea] ?? []]);
		if (student.workArea) {
			near.add(student.workArea);
			for (const a of ADJACENT[student.workArea] ?? []) near.add(a);
		}
		return near.has(hub);
	}
	return true;
}
function matchesWindow(student, window) {
	if (student.timeWindows.includes(window)) return true;
	const bucket = TIME_WINDOWS.find((w) => w.id === window)?.bucket;
	return Boolean(bucket && student.preferredTimes.includes(bucket));
}
function matchesSlot(student, slot) {
	if (!areaReachable(student, slot.area)) return false;
	if (!student.preferredDays.includes(slot.day)) return false;
	if (!matchesWindow(student, slot.window)) return false;
	if (!student.classTypes.includes(slot.classType)) return false;
	return true;
}
function isCommittable(student, price) {
	return student.commitPrice >= price && student.frequency !== "occasional";
}
function programmeEligible(student) {
	if (student.commitmentStyle === "fixed") return true;
	if (student.commitmentStyle === "monthly") return true;
	return student.packages.includes("8pack") || student.packages.includes("monthly");
}
function hybridSessions(student, sessions) {
	if (student.commitmentStyle === "monthly" || student.packages.includes("monthly")) return sessions;
	if (student.commitmentStyle === "fixed" || student.packages.includes("8pack")) return sessions;
	if (student.packages.includes("4pack")) return Math.min(4, sessions);
	if (student.packages.includes("dropin")) return Math.min(2, sessions);
	return Math.min(4, sessions);
}
function splitRevenue(students, price, sessions) {
	let eightPackHeads = 0;
	let fourPackHeads = 0;
	let monthlyHeads = 0;
	let dropinHeads = 0;
	let programmeRevenue = 0;
	let hybridRevenue = 0;
	let sessionsSoldHybrid = 0;
	for (const s of students) {
		const hs = hybridSessions(s, sessions);
		hybridRevenue += hs * price;
		sessionsSoldHybrid += hs;
		if (s.commitmentStyle === "monthly" || s.packages.includes("monthly")) {
			monthlyHeads += 1;
			programmeRevenue += sessions * price;
		} else if (s.commitmentStyle === "fixed" || s.packages.includes("8pack")) {
			eightPackHeads += 1;
			programmeRevenue += sessions * price;
		} else if (s.packages.includes("4pack")) fourPackHeads += 1;
		else dropinHeads += 1;
	}
	return {
		eightPackHeads,
		fourPackHeads,
		monthlyHeads,
		dropinHeads,
		programmeRevenue,
		hybridRevenue,
		sessionsSoldHybrid
	};
}
function scoreSlot(responses, slot, settings) {
	const matching = responses.filter((s) => matchesSlot(s, slot));
	const committable = matching.filter((s) => isCommittable(s, settings.price));
	const programme = committable.filter(programmeEligible);
	const studio = committable.length >= settings.largeFrom ? "large" : "small";
	const rental = (studio === "large" ? settings.largeRental : settings.smallRental) * settings.hours * settings.sessions;
	const split = splitRevenue(committable, settings.price, settings.sessions);
	const programmeContribution = splitRevenue(programme, settings.price, settings.sessions).programmeRevenue - rental;
	const hybridContribution = split.hybridRevenue - rental;
	return {
		...slot,
		interested: matching.length,
		committable: committable.length,
		programmeHeads: programme.length,
		rental,
		studio,
		split,
		programmeContribution,
		hybridContribution,
		viableProgramme: programme.length >= settings.minStudents && programmeContribution > 0,
		viableHybrid: committable.length >= settings.minStudents && hybridContribution > 0,
		names: matching.map((s) => s.firstName)
	};
}
function rankSlots(responses, settings) {
	const out = [];
	for (const hub of HUBS) for (const day of DAYS) for (const window of TIME_WINDOWS) for (const cls of CLASS_TYPES) {
		const score = scoreSlot(responses, {
			area: hub.id,
			day: day.id,
			window: window.id,
			classType: cls.id
		}, settings);
		if (score.interested < 4) continue;
		out.push(score);
	}
	out.sort((a, b) => {
		const av = Number(a.viableHybrid) + Number(a.viableProgramme);
		const bv = Number(b.viableHybrid) + Number(b.viableProgramme);
		if (bv !== av) return bv - av;
		if (b.hybridContribution !== a.hybridContribution) return b.hybridContribution - a.hybridContribution;
		if (b.committable !== a.committable) return b.committable - a.committable;
		return b.interested - a.interested;
	});
	return out;
}
function heatmap(responses, area) {
	const pool = area ? responses.filter((s) => areaReachable(s, area)) : responses;
	const cells = [];
	for (const day of DAYS) for (const window of TIME_WINDOWS) {
		const count = pool.filter((s) => s.preferredDays.includes(day.id) && matchesWindow(s, window.id)).length;
		cells.push({
			day: day.id,
			window: window.id,
			count
		});
	}
	return cells;
}
function areaDemand(responses) {
	return AREAS.map((area) => ({
		area: area.id,
		cluster: area.cluster,
		live: responses.filter((s) => s.liveArea === area.id).length,
		convenient: responses.filter((s) => s.convenientAreas.includes(area.id)).length
	}));
}
function classDemand(responses) {
	return CLASS_TYPES.map((c) => ({
		id: c.id,
		count: responses.filter((s) => s.classTypes.includes(c.id)).length
	})).sort((a, b) => b.count - a.count);
}
function priceCurve(responses) {
	return [
		15,
		18,
		20,
		22,
		25,
		28,
		30
	].map((price) => ({
		price,
		overallCommit: responses.filter((s) => s.commitPrice >= price).length,
		overallStated: responses.filter((s) => s.statedPrice >= price).length
	}));
}
function clusterCounts(responses) {
	const east = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "east").length;
	const ne = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "northeast").length;
	const central = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "central").length;
	return [
		{
			id: "east",
			label: "East",
			count: east
		},
		{
			id: "northeast",
			label: "North-East",
			count: ne
		},
		{
			id: "central",
			label: "Central",
			count: central
		}
	];
}
function slotTitle(slot) {
	return `${DAYS.find((d) => d.id === slot.day)?.label ?? slot.day} ${TIME_WINDOWS.find((w) => w.id === slot.window)?.label ?? slot.window} · ${AREA_BY_ID[slot.area]?.label ?? slot.area} · ${CLASS_TYPES.find((c) => c.id === slot.classType)?.label ?? slot.classType}`;
}
function buildInsights(responses, ranked) {
	const insights = [];
	if (responses.length === 0) return [{
		title: "No responses yet",
		body: "Share the student form. Analysis fills in as people reply.",
		tone: "note"
	}];
	const current = ranked.find((s) => s.area === "tampines" && s.day === "fri" && s.window === "0900" && s.classType === "hatha");
	const best = ranked[0];
	const bestProgramme = ranked.find((s) => s.viableProgramme) ?? ranked.find((s) => s.programmeHeads >= 8);
	if (current) {
		if (!current.viableProgramme) insights.push({
			title: "Friday Tampines 8-week lock-in is tight",
			body: `${current.interested} students are interested in Friday 9:00 Hatha in Tampines, but only ${current.programmeHeads} would lock an 8-session programme at the current price. Studio rent is still due for all eight weeks. A flexible pack with makeup keeps ${current.committable} paying students in the pool.`,
			tone: "warn"
		});
		else insights.push({
			title: "Friday Tampines can work as a programme",
			body: `${current.programmeHeads} students would take a fixed 8-session Hatha. Hybrid contribution ${current.hybridContribution >= 0 ? "covers" : "does not cover"} rent.`,
			tone: "go"
		});
	}
	if (best && best !== current) insights.push({
		title: `Strongest slot: ${slotTitle(best)}`,
		body: `${best.committable} would pay the current price (${best.interested} interested). Hybrid contribution ${best.hybridContribution >= 0 ? "is" : "is not"} positive after ${best.studio} studio rent.`,
		tone: best.viableHybrid ? "go" : "note"
	});
	const flexible = responses.filter((s) => s.commitmentStyle === "flexible").length;
	const fixed = responses.filter((s) => s.commitmentStyle === "fixed").length;
	const makeupNeed = responses.filter((s) => s.makeup === "essential").length;
	insights.push({
		title: "Flexibility is the product, not a perk",
		body: `${flexible} prefer a flexible pack vs ${fixed} who want a fixed programme. ${makeupNeed} say makeup classes are essential. An 8-week closed course will shrink the room; a 4-pack that can be used at another Nila class keeps the community.`,
		tone: "note"
	});
	if (bestProgramme && bestProgramme.classType === "therapy") insights.push({
		title: "Yoga Therapy can be the closed programme",
		body: `${slotTitle(bestProgramme)} already behaves like a course — students accept an 8-session commitment when the work is therapeutic. Run that as a closed group, and keep East morning classes flexible.`,
		tone: "go"
	});
	else if (bestProgramme) insights.push({
		title: "If you need a closed 8-week, pick the slot that already wants it",
		body: `${slotTitle(bestProgramme)} has ${bestProgramme.programmeHeads} programme-ready students. Don’t force the East morning crowd into that model.`,
		tone: "note"
	});
	const east = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "east").length;
	const ne = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "northeast").length;
	const central = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "central").length;
	insights.push({
		title: "Don’t rent one studio for everyone",
		body: `${east} live in the East, ${ne} in the North-East, ${central} in Central. These are separate small groups — Tampines Friday, AMK weekday evening, Central specialist — not one large class.`,
		tone: "note"
	});
	const statedAvg = responses.reduce((a, s) => a + s.statedPrice, 0) / Math.max(responses.length, 1);
	const commitAvg = responses.reduce((a, s) => a + s.commitPrice, 0) / Math.max(responses.length, 1);
	insights.push({
		title: "They name a higher price than they will pay",
		body: `Average “feels fair” is S$${statedAvg.toFixed(0)}; average they will actually commit is S$${commitAvg.toFixed(0)}. Price the launch on the commit number, not the wish number.`,
		tone: "warn"
	});
	return insights.slice(0, 6);
}
function currentPlanScore(responses, settings) {
	return scoreSlot(responses, {
		area: "tampines",
		day: "fri",
		window: "0900",
		classType: "hatha"
	}, {
		...DEFAULT_SETTINGS,
		...settings,
		price: settings.price,
		sessions: settings.sessions
	});
}
function ScenarioLab({ students, settings, onSettings, draft, onDraft }) {
	const score = (0, import_react.useMemo)(() => scoreSlot(students, draft, settings), [
		students,
		draft,
		settings
	]);
	const breakEven = Math.ceil(settings.smallRental / Math.max(settings.price, 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Build a class" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Location",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: draft.area,
						onChange: (area) => onDraft({
							...draft,
							area
						}),
						options: HUBS.map((h) => ({
							id: h.id,
							label: h.label
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Day",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: draft.day,
						onChange: (day) => onDraft({
							...draft,
							day
						}),
						options: DAYS.map((d) => ({
							id: d.id,
							label: d.label
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Time",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: draft.window,
						onChange: (window) => onDraft({
							...draft,
							window
						}),
						options: TIME_WINDOWS.map((w) => ({
							id: w.id,
							label: w.label
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Class",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: draft.classType,
						onChange: (classType) => onDraft({
							...draft,
							classType
						}),
						options: CLASS_TYPES.map((c) => ({
							id: c.id,
							label: c.label
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: `Price per class · ${formatSgd(settings.price)}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 15,
						max: 30,
						step: 1,
						value: [settings.price],
						onValueChange: (value) => onSettings({
							...settings,
							price: value[0] ?? settings.price
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: `Programme length · ${settings.sessions} sessions`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 4,
						max: 12,
						step: 1,
						value: [settings.sessions],
						onValueChange: (value) => onSettings({
							...settings,
							sessions: value[0] ?? settings.sessions
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: `Small studio rent · ${formatSgd(settings.smallRental)}/hr`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 60,
						max: 180,
						step: 10,
						value: [settings.smallRental],
						onValueChange: (value) => onSettings({
							...settings,
							smallRental: value[0] ?? settings.smallRental
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: `Need at least ${settings.minStudents} paying students`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 6,
						max: 16,
						step: 1,
						value: [settings.minStudents],
						onValueChange: (value) => onSettings({
							...settings,
							minStudents: value[0] ?? settings.minStudents
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Break-even on rent alone is ",
						breakEven,
						" students at ",
						formatSgd(settings.price),
						" in a small studio. Empty spots still pay the landlord."
					]
				})
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex flex-row items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: slotTitle(score) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: draft.label
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: score.viableHybrid ? "sage" : "warn",
				children: score.viableHybrid ? "Covers rent" : "Not yet"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							n: score.interested,
							label: "Interested"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							n: score.committable,
							label: `Pay ${formatSgd(settings.price)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							n: score.programmeHeads,
							label: "8-week lock-in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							n: score.studio === "large" ? settings.largeRental : settings.smallRental,
							label: `${score.studio} studio /hr`,
							money: true
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-paper-deep p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
						children: [
							"If Nila runs ",
							settings.sessions,
							" weekly hours"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyRow, {
							title: "Closed 8-session programme",
							revenue: score.split.programmeRevenue,
							rent: score.rental,
							contribution: score.programmeContribution,
							detail: `${score.programmeHeads} students × ${settings.sessions} × ${formatSgd(settings.price)}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyRow, {
							title: "Flexible packs (blended)",
							revenue: score.split.hybridRevenue,
							rent: score.rental,
							contribution: score.hybridContribution,
							detail: `${score.split.eightPackHeads + score.split.monthlyHeads} on 8s, ${score.split.fourPackHeads} on 4s, ${score.split.dropinHeads} drop-in. Rent is still ${settings.sessions} hours.`
						})]
					})]
				}),
				score.names.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"In the pool: ",
						score.names.slice(0, 14).join(", "),
						score.names.length > 14 ? ` +${score.names.length - 14}` : "",
						"."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No one in this combination yet."
				})
			]
		})] })]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Select({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "h-11 w-full rounded-md border border-input bg-card px-3 text-sm",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: o.id,
			children: o.label
		}, o.id))
	});
}
function Stat({ n, label, money }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-muted/70 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-medium tabular-nums",
			children: money ? formatSgd(n) : n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: label
		})]
	});
}
function MoneyRow({ title, revenue, rent, contribution, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: detail
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-2 space-y-1 text-sm tabular-nums",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Revenue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatSgd(revenue) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Studio rent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatSgd(rent) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Gross contribution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: contribution >= 0 ? "text-primary" : "text-destructive",
						children: formatSgd(contribution)
					})]
				})
			]
		})
	] });
}
function StudentTable({ students }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [cluster, setCluster] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return students.filter((s) => {
			if (cluster !== "all" && AREA_BY_ID[s.liveArea]?.cluster !== cluster) return false;
			if (!needle) return true;
			return [
				s.firstName,
				AREA_BY_ID[s.liveArea]?.label,
				s.classTypes.map((c) => labelOf(CLASS_TYPES, c)).join(" "),
				s.preferredDays.map((d) => labelOf(DAYS, d)).join(" ")
			].join(" ").toLowerCase().includes(needle);
		});
	}, [
		students,
		q,
		cluster
	]);
	function exportCsv() {
		const headers = [
			"name",
			"lives",
			"works",
			"convenient",
			"travel",
			"days",
			"times",
			"classes",
			"frequency",
			"stated_price",
			"commit_price",
			"packages",
			"commitment",
			"makeup",
			"true_yoga"
		];
		const lines = filtered.map((s) => [
			s.firstName,
			s.liveArea,
			s.workArea,
			s.convenientAreas.join("|"),
			s.travel,
			s.preferredDays.join("|"),
			s.timeWindows.join("|"),
			s.classTypes.join("|"),
			s.frequency,
			s.statedPrice,
			s.commitPrice,
			s.packages.join("|"),
			s.commitmentStyle,
			s.makeup,
			s.trueYogaStudent ? "yes" : "no"
		].map((v) => `"${String(v).replaceAll("\"", "\"\"")}"`).join(","));
		const blob = new Blob([[headers.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "nila-students.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search name, area, class…",
						className: "sm:max-w-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"all",
							"east",
							"northeast",
							"central"
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCluster(c),
							className: cluster === c ? "h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground" : "h-9 rounded-md bg-card px-3 text-sm shadow-card",
							children: c === "all" ? "All" : c === "northeast" ? "North-East" : c[0].toUpperCase() + c.slice(1)
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "sm:ml-auto",
						onClick: exportCsv,
						children: "Download CSV"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl bg-card shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[44rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Student"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Lives"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "When"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Practice"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Pay"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Commit"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70 last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: s.firstName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										s.trueYogaStudent ? "True Yoga" : "New",
										" · ",
										s.frequency
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: AREA_BY_ID[s.liveArea]?.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: s.preferredDays.map((d) => labelOf(DAYS, d).slice(0, 3)).join(" ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1",
									children: s.classTypes.slice(0, 2).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "sage",
										children: labelOf(CLASS_TYPES, c)
									}, c))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 tabular-nums",
								children: [
									"S$",
									s.commitPrice,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [" / said S$", s.statedPrice]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 capitalize",
								children: s.commitmentStyle
							})
						]
					}, s.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [filtered.length, " people in this view."]
			})
		]
	});
}
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 items-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-card", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-5 outline-none", className),
		...props
	});
}
var NILA_PLAN = {
	label: "Nila’s current plan",
	area: "tampines",
	day: "fri",
	window: "0900",
	classType: "hatha"
};
function StudioDashboard() {
	const { data: students = [], isLoading } = useQuery({
		queryKey: ["responses"],
		queryFn: () => listResponses()
	});
	const [settings, setSettings] = (0, import_react.useState)(DEFAULT_SETTINGS);
	const [draft, setDraft] = (0, import_react.useState)(NILA_PLAN);
	const [heatArea, setHeatArea] = (0, import_react.useState)("all");
	const [tab, setTab] = (0, import_react.useState)("slots");
	const ranked = (0, import_react.useMemo)(() => rankSlots(students, settings), [students, settings]);
	const top = ranked.slice(0, 6);
	const current = (0, import_react.useMemo)(() => currentPlanScore(students, settings), [students, settings]);
	const insights = (0, import_react.useMemo)(() => buildInsights(students, ranked), [students, ranked]);
	const areas = (0, import_react.useMemo)(() => areaDemand(students), [students]);
	const classes = (0, import_react.useMemo)(() => classDemand(students), [students]);
	const prices = (0, import_react.useMemo)(() => priceCurve(students), [students]);
	const clusters = (0, import_react.useMemo)(() => clusterCounts(students), [students]);
	const heat = (0, import_react.useMemo)(() => heatmap(students, heatArea === "all" ? void 0 : heatArea), [students, heatArea]);
	const alumni = students.filter((s) => s.trueYogaStudent).length;
	const flexible = students.filter((s) => s.commitmentStyle === "flexible").length;
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-16 text-sm text-muted-foreground",
		children: "Reading the community…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
						children: "Studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-medium",
						children: "Demand, then a room."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted-foreground",
						children: "Work backwards from Nila’s students. Share the form, watch clusters form, then rent a studio only when a slot covers the landlord."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: async () => {
						const url = `${window.location.origin}/`;
						await navigator.clipboard.writeText(url);
						toast.success("Student form link copied.");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Copy student form"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "In the community",
						value: String(students.length),
						hint: `${alumni} from True Yoga`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "East / NE / Central",
						value: clusters.map((c) => c.count).join(" · "),
						hint: "Live-here clusters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Prefer flexible packs",
						value: `${flexible}`,
						hint: "Not an 8-week lock-in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Viable slots now",
						value: String(ranked.filter((s) => s.viableHybrid).length),
						hint: `At ${formatSgd(settings.price)}, min ${settings.minStudents}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Launch sequence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Don’t fill one large class. Grow three small groups if the numbers hold." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "grid gap-4 lg:grid-cols-3",
					children: insights.map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-paper-deep p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: insight.tone === "go" ? "sage" : insight.tone === "warn" ? "warn" : "muted",
								children: insight.tone === "go" ? "Do this" : insight.tone === "warn" ? "Watch" : "Note"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium",
								children: insight.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: insight.body
							})
						]
					}, insight.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: tab,
				onValueChange: setTab,
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "flex h-auto w-full flex-wrap justify-start gap-1 sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "slots",
								children: "Viable classes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "map",
								children: "Where & when"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "price",
								children: "Pricing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "lab",
								children: "Scenario lab"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "people",
								children: "Students"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "slots",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotCompare, {
							current,
							settings
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 md:grid-cols-2",
							children: top.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "rounded-xl bg-card p-5 text-left shadow-card transition-transform duration-150 hover:-translate-y-0.5",
								onClick: () => {
									setDraft({
										label: "From demand list",
										area: slot.area,
										day: slot.day,
										window: slot.window,
										classType: slot.classType
									});
									setTab("lab");
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "flex items-center gap-1.5 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), AREA_BY_ID[slot.area]?.label]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-xl font-medium",
											children: slotTitle(slot)
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: slot.viableHybrid ? "sage" : "warn",
											children: slot.viableHybrid ? "Viable" : "Thin"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "mt-4 grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
												k: "Interested",
												v: slot.interested
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
												k: "Would pay",
												v: slot.committable
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
												k: "8-week",
												v: slot.programmeHeads
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
												k: "Hybrid",
												v: formatSgd(slot.hybridContribution),
												good: slot.hybridContribution >= 0
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-xs text-muted-foreground",
										children: [
											"Rent ",
											formatSgd(slot.rental),
											" · ",
											slot.studio,
											" studio · opens in the lab"
										]
									})
								]
							}, `${slot.area}-${slot.day}-${slot.window}-${slot.classType}`))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "map",
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Day × time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "How many students said they could come. Tap a cell to open the lab." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubChip, {
								active: heatArea === "all",
								onClick: () => setHeatArea("all"),
								children: "All areas"
							}), HUBS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubChip, {
								active: heatArea === h.id,
								onClick: () => setHeatArea(h.id),
								children: h.label
							}, h.id))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heatmap, {
							cells: heat,
							onPick: (day, window) => {
								setDraft((d) => ({
									...d,
									label: "From heatmap",
									day,
									window,
									area: heatArea === "all" ? d.area : heatArea
								}));
								setTab("lab");
							}
						})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 lg:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Where they live vs where they’d go" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaBars, { data: areas }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Class interest" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassBars, { data: classes }) })] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "price",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Stated price vs committed price" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "The left bar is what feels fair. The right bar is who would actually buy. Plan rent on the right bar." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceBars, { data: prices }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "4-class pack at S$18"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-2xl tabular-nums",
											children: "S$72"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: [
												"Converts more people. Four weeks of rent still costs ",
												formatSgd(settings.smallRental * 4),
												"."
											]
										})
									]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "8-class pack at S$18"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-2xl tabular-nums",
											children: "S$144"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: [
												"Covers eight hours of rent once ",
												Math.ceil(settings.smallRental * 8 / 144),
												" ",
												"people buy — but fewer will lock the dates."
											]
										})
									]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Makeup across Nila’s classes"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-2xl",
											children: "Keep the pack"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: "Predictable income without trapping people on Friday morning. Empty Friday spots can be filled from another group."
										})
									]
								}) })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "lab",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioLab, {
							students,
							settings,
							onSettings: setSettings,
							draft,
							onDraft: setDraft
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "people",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentTable, { students })
					})
				]
			})
		]
	});
}
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl font-medium tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			})
		]
	}) });
}
function Mini({ k, v, good }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-muted-foreground",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: `font-medium tabular-nums ${good === false ? "text-destructive" : ""}`,
		children: v
	})] });
}
function HubChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: active ? "h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground" : "h-9 rounded-md bg-muted px-3 text-sm",
		children
	});
}
function SlotCompare({ current, settings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Nila’s current plan, scored" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
		"Friday 9:00 Hatha in Tampines · ",
		formatSgd(settings.price),
		" · ",
		settings.sessions,
		" sessions · small studio ",
		formatSgd(settings.smallRental),
		"/hr"
	] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "grid gap-4 sm:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Interested / would pay / 8-week"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-display text-2xl tabular-nums",
				children: [
					current.interested,
					" · ",
					current.committable,
					" · ",
					current.programmeHeads
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Programme contribution"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-2xl tabular-nums",
					children: formatSgd(current.programmeContribution)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						formatSgd(current.split.programmeRevenue),
						" in − ",
						formatSgd(current.rental),
						" rent"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "If packs stay flexible"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-2xl tabular-nums",
					children: formatSgd(current.hybridContribution)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Same rent. Revenue only from classes people actually buy."
				})
			] })
		]
	})] });
}
function Studio() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		current: "studio",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioDashboard, {})
	});
}
//#endregion
export { Studio as component };
