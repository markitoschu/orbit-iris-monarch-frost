import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as object, i as number, n as boolean, o as string, t as array } from "../_libs/zod.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-DVS4XdK2.js
var import_jsx_runtime = require_jsx_runtime();
function NilaMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		fill: "none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 26c-4.2-3.4-10-8.2-10-14.2C6 8.2 9 5.5 12.2 5.5c1.9 0 3.2 1 3.8 2.4.6-1.4 1.9-2.4 3.8-2.4C23 5.5 26 8.2 26 11.8 26 17.8 20.2 22.6 16 26Z",
			fill: "currentColor"
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatSgd(n) {
	return `S$${Math.round(n).toLocaleString("en-SG")}`;
}
function AppShell({ children, current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NilaMark, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-medium tracking-tight",
							children: "Nila"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase",
							children: "Yoga"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/",
						active: current === "survey",
						children: "Student form"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/studio",
						active: current === "studio",
						children: "Studio"
					})]
				})]
			})
		}), children]
	});
}
function NavLink({ to, active, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: cn("flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors duration-150", active ? "bg-sage-soft text-accent-foreground" : "text-muted-foreground hover:text-foreground"),
		children
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,opacity,transform] duration-150 ease-[var(--ease-out-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline: "border border-border bg-card text-foreground hover:bg-muted",
			ghost: "text-foreground hover:bg-muted",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md border border-input bg-card px-3 text-base text-foreground shadow-none transition-[box-shadow,border-color] duration-150 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-foreground", className),
		...props
	});
}
var AREAS = [
	{
		id: "tampines",
		label: "Tampines",
		cluster: "east",
		hub: true
	},
	{
		id: "bedok",
		label: "Bedok",
		cluster: "east",
		hub: true
	},
	{
		id: "pasir_ris",
		label: "Pasir Ris",
		cluster: "east",
		hub: false
	},
	{
		id: "simei",
		label: "Simei",
		cluster: "east",
		hub: false
	},
	{
		id: "marine_parade",
		label: "Marine Parade",
		cluster: "east",
		hub: false
	},
	{
		id: "amk",
		label: "Ang Mo Kio",
		cluster: "northeast",
		hub: true
	},
	{
		id: "serangoon",
		label: "Serangoon",
		cluster: "northeast",
		hub: true
	},
	{
		id: "hougang",
		label: "Hougang",
		cluster: "northeast",
		hub: false
	},
	{
		id: "bishan",
		label: "Bishan",
		cluster: "northeast",
		hub: false
	},
	{
		id: "punggol",
		label: "Punggol / Sengkang",
		cluster: "northeast",
		hub: false
	},
	{
		id: "bugis",
		label: "Bugis / City Hall",
		cluster: "central",
		hub: true
	},
	{
		id: "tanjong_pagar",
		label: "Tanjong Pagar / Raffles Place",
		cluster: "central",
		hub: true
	},
	{
		id: "chinatown",
		label: "Chinatown",
		cluster: "central",
		hub: false
	},
	{
		id: "novena",
		label: "Novena",
		cluster: "central",
		hub: false
	},
	{
		id: "orchard",
		label: "Orchard",
		cluster: "central",
		hub: false
	}
];
var HUBS = AREAS.filter((a) => a.hub);
var AREA_BY_ID = Object.fromEntries(AREAS.map((a) => [a.id, a]));
var ADJACENT = {
	tampines: [
		"bedok",
		"pasir_ris",
		"simei"
	],
	bedok: [
		"tampines",
		"simei",
		"marine_parade"
	],
	pasir_ris: ["tampines", "simei"],
	simei: [
		"tampines",
		"bedok",
		"pasir_ris"
	],
	marine_parade: ["bedok", "bugis"],
	amk: [
		"bishan",
		"serangoon",
		"hougang"
	],
	serangoon: [
		"amk",
		"hougang",
		"bishan",
		"novena"
	],
	hougang: [
		"serangoon",
		"amk",
		"punggol"
	],
	bishan: [
		"amk",
		"serangoon",
		"novena"
	],
	punggol: ["hougang", "serangoon"],
	bugis: [
		"chinatown",
		"tanjong_pagar",
		"novena",
		"orchard",
		"marine_parade"
	],
	tanjong_pagar: [
		"chinatown",
		"bugis",
		"orchard"
	],
	chinatown: ["tanjong_pagar", "bugis"],
	novena: [
		"orchard",
		"bugis",
		"bishan",
		"serangoon"
	],
	orchard: [
		"novena",
		"bugis",
		"tanjong_pagar"
	]
};
var DAYS = [
	{
		id: "mon",
		label: "Monday",
		short: "Mon"
	},
	{
		id: "tue",
		label: "Tuesday",
		short: "Tue"
	},
	{
		id: "wed",
		label: "Wednesday",
		short: "Wed"
	},
	{
		id: "thu",
		label: "Thursday",
		short: "Thu"
	},
	{
		id: "fri",
		label: "Friday",
		short: "Fri"
	},
	{
		id: "sat",
		label: "Saturday",
		short: "Sat"
	},
	{
		id: "sun",
		label: "Sunday",
		short: "Sun"
	}
];
var TIME_BUCKETS = [
	{
		id: "early",
		label: "Early morning",
		hint: "6:30–8:30"
	},
	{
		id: "morning",
		label: "Morning",
		hint: "9:00–12:00"
	},
	{
		id: "lunch",
		label: "Lunch",
		hint: "12:00–14:00"
	},
	{
		id: "afternoon",
		label: "Afternoon",
		hint: "14:00–18:00"
	},
	{
		id: "evening",
		label: "Evening",
		hint: "18:30–20:30"
	}
];
var TIME_WINDOWS = [
	{
		id: "0630",
		label: "6:30–7:30",
		bucket: "early"
	},
	{
		id: "0730",
		label: "7:30–8:30",
		bucket: "early"
	},
	{
		id: "0900",
		label: "9:00–10:00",
		bucket: "morning"
	},
	{
		id: "1000",
		label: "10:00–11:00",
		bucket: "morning"
	},
	{
		id: "1100",
		label: "11:00–12:00",
		bucket: "morning"
	},
	{
		id: "1215",
		label: "12:15–13:15",
		bucket: "lunch"
	},
	{
		id: "1830",
		label: "18:30–19:30",
		bucket: "evening"
	},
	{
		id: "1930",
		label: "19:30–20:30",
		bucket: "evening"
	}
];
var CLASS_TYPES = [
	{
		id: "hatha",
		label: "Hatha",
		blurb: "Steady, alignment-led"
	},
	{
		id: "vinyasa",
		label: "Vinyasa Flow",
		blurb: "Breath-linked movement"
	},
	{
		id: "ashtanga",
		label: "Ashtanga",
		blurb: "Set sequence, stronger"
	},
	{
		id: "yin",
		label: "Yin",
		blurb: "Long holds, quiet"
	},
	{
		id: "restorative",
		label: "Restorative",
		blurb: "Supported rest"
	},
	{
		id: "therapy",
		label: "Yoga Therapy",
		blurb: "Personal, therapeutic"
	},
	{
		id: "beginners",
		label: "Foundations",
		blurb: "Beginner-friendly"
	},
	{
		id: "pranayama",
		label: "Breath & meditation",
		blurb: "Pranayama, stillness"
	}
];
var FREQUENCIES = [
	{
		id: "weekly",
		label: "Once a week",
		sessions: 1
	},
	{
		id: "twice",
		label: "Twice a week",
		sessions: 2
	},
	{
		id: "few",
		label: "2–3 times a week",
		sessions: 2.5
	},
	{
		id: "occasional",
		label: "Occasionally",
		sessions: .4
	}
];
var PACKAGES = [
	{
		id: "dropin",
		label: "Drop-in / single class"
	},
	{
		id: "4pack",
		label: "4-class package"
	},
	{
		id: "8pack",
		label: "8-class package"
	},
	{
		id: "monthly",
		label: "Monthly membership"
	},
	{
		id: "private",
		label: "Small-group private (3–5 people)"
	}
];
var COMMIT_STYLES = [
	{
		id: "fixed",
		label: "Fixed 8-session programme",
		hint: "Same slot each week. Simple for Nila, less flexible for you."
	},
	{
		id: "flexible",
		label: "Flexible class pack",
		hint: "Use classes within a window, including makeup at another Nila class."
	},
	{
		id: "monthly",
		label: "Monthly membership",
		hint: "Come as often as you like that month."
	}
];
var MAKEUP = [
	{
		id: "essential",
		label: "I need makeup classes — my Fridays are unpredictable"
	},
	{
		id: "valued",
		label: "I would value makeup, but I can usually make a fixed slot"
	},
	{
		id: "no",
		label: "I can commit to a fixed weekly slot"
	}
];
var PRIORITIES = [
	{
		id: "location_home",
		label: "Near home"
	},
	{
		id: "location_work",
		label: "Near work"
	},
	{
		id: "mrt",
		label: "MRT access"
	},
	{
		id: "parking",
		label: "Parking"
	},
	{
		id: "bus",
		label: "Bus access"
	},
	{
		id: "size",
		label: "Studio size / not crowded"
	},
	{
		id: "mats",
		label: "Mats & props provided"
	},
	{
		id: "price",
		label: "Price"
	},
	{
		id: "small_group",
		label: "Small group (knowing classmates)"
	},
	{
		id: "same_slot",
		label: "Same classmates each week"
	}
];
var TRAVEL = [
	{
		id: "same",
		label: "Stay in my neighbourhood",
		hint: "10 minutes or less"
	},
	{
		id: "nearby",
		label: "Nearby MRT is fine",
		hint: "About 10–20 minutes"
	},
	{
		id: "island",
		label: "I’ll travel farther for Nila",
		hint: "Across town if the class is right"
	}
];
var DEFAULT_SETTINGS = {
	smallRental: 100,
	largeRental: 120,
	largeFrom: 13,
	minStudents: 10,
	sessions: 8,
	price: 18,
	hours: 1
};
function labelOf(list, id) {
	return list.find((x) => x.id === id)?.label ?? id;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
var listResponses = createServerFn({ method: "GET" }).handler(createSsrRpc("8d3cfe6ab277d3b4826cfc4c31f6948de0cca91644278a3f5772e5a529d06e7a"));
var submitResponse = createServerFn({ method: "POST" }).validator((data) => surveySchema.parse(data)).handler(createSsrRpc("fbc51cc29b21ba506427eaf95ca37adc7f9a72b27a2b1db192f4df9de0b56069"));
//#endregion
export { listResponses as C, labelOf as S, TIME_BUCKETS as _, Button as a, cn as b, DAYS as c, HUBS as d, Input as f, PRIORITIES as g, PACKAGES as h, AppShell as i, DEFAULT_SETTINGS as l, MAKEUP as m, AREAS as n, CLASS_TYPES as o, Label as p, AREA_BY_ID as r, COMMIT_STYLES as s, ADJACENT as t, FREQUENCIES as u, TIME_WINDOWS as v, submitResponse as w, formatSgd as x, TRAVEL as y };
