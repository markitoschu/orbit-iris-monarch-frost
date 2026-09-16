import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ArrowRight, i as Check, o as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as TIME_BUCKETS, a as Button, b as cn, c as DAYS, f as Input, g as PRIORITIES, h as PACKAGES, i as AppShell, m as MAKEUP, n as AREAS, o as CLASS_TYPES, p as Label, s as COMMIT_STYLES, u as FREQUENCIES, v as TIME_WINDOWS, w as submitResponse, y as TRAVEL } from "./server-DVS4XdK2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D4KXx6Hm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChoiceGroup({ options, value, onChange, multiple = false, columns = "wrap" }) {
	const selected = new Set(Array.isArray(value) ? value : value ? [value] : []);
	function toggle(id) {
		if (multiple) {
			const next = new Set(selected);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			onChange([...next]);
		} else onChange(id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-2", columns === "stack" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"),
		children: options.map((opt) => {
			const on = selected.has(opt.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => toggle(opt.id),
				"aria-pressed": on,
				className: cn("min-h-11 rounded-lg px-3.5 py-3 text-left transition-[background-color,box-shadow,color] duration-150 ease-[var(--ease-out-soft)]", on ? "bg-primary text-primary-foreground shadow-card" : "bg-card text-foreground shadow-card hover:bg-sage-soft"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-medium",
					children: opt.label
				}), opt.hint || opt.blurb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-0.5 block text-xs", on ? "text-primary-foreground/80" : "text-muted-foreground"),
					children: opt.hint ?? opt.blurb
				}) : null]
			}, opt.id);
		})
	});
}
function Progress({ value, className }) {
	const pct = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-primary transition-[width] duration-300 ease-[var(--ease-out-soft)]",
			style: { width: `${pct}%` }
		})
	});
}
var STEPS = [
	"Welcome",
	"You",
	"Where",
	"When",
	"Practice",
	"Paying",
	"Studio"
];
var empty = {
	firstName: "",
	liveArea: "tampines",
	workArea: "",
	convenientAreas: [],
	travel: "nearby",
	preferredDays: [],
	preferredTimes: [],
	timeWindows: [],
	classTypes: [],
	frequency: "weekly",
	statedPrice: 20,
	commitPrice: 18,
	packages: [],
	commitmentStyle: "flexible",
	makeup: "valued",
	studioPriorities: [],
	trueYogaStudent: true
};
function SurveyForm() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [data, setData] = (0, import_react.useState)(empty);
	const [done, setDone] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (payload) => submitResponse({ data: payload }),
		onSuccess: (res) => {
			queryClient.invalidateQueries({ queryKey: ["responses"] });
			setDone({
				name: data.firstName.trim(),
				total: res.total
			});
		},
		onError: () => {
			toast.error("Could not save your answers. Please try again.");
		}
	});
	const windowChoices = (0, import_react.useMemo)(() => {
		if (data.preferredTimes.length === 0) return [...TIME_WINDOWS];
		return TIME_WINDOWS.filter((w) => data.preferredTimes.includes(w.bucket));
	}, [data.preferredTimes]);
	function patch(partial) {
		setData((prev) => ({
			...prev,
			...partial
		}));
		setError("");
	}
	function validate() {
		if (step === 1) {
			if (!data.firstName.trim()) return "Please add the name Nila knows you by.";
		}
		if (step === 2) {
			if (data.convenientAreas.length === 0) return "Pick at least one area that works.";
		}
		if (step === 3) {
			if (data.preferredDays.length === 0) return "Pick the days you could actually come.";
			if (data.preferredTimes.length === 0) return "Pick a time of day.";
			if (data.timeWindows.length === 0) return "Pick at least one specific window.";
		}
		if (step === 4) {
			if (data.classTypes.length === 0) return "Pick the practices you want.";
		}
		if (step === 5) {
			if (data.packages.length === 0) return "Pick how you’d like to pay.";
		}
		if (step === 6) {
			if (data.studioPriorities.length === 0) return "Pick up to three studio priorities.";
		}
		return null;
	}
	function next() {
		const problem = validate();
		if (problem) {
			setError(problem);
			return;
		}
		if (step < STEPS.length - 1) setStep((s) => s + 1);
		else mutation.mutate(data);
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-16 sm:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
				children: "Received"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 font-display text-4xl font-medium",
				children: [
					"Thank you, ",
					done.name,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-muted-foreground",
				children: [
					"You’re one of ",
					done.total,
					" people helping Nila choose where, when, and how to teach — working backwards from this community, not from an empty studio."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						children: "See the studio view"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => {
						setDone(null);
						setData(empty);
						setStep(0);
					},
					children: "Add another person"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-xl flex-col px-4 py-8 sm:py-12",
		children: step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, { onStart: () => setStep(1) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between text-xs font-medium tracking-wide text-muted-foreground uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						step,
						" of ",
						STEPS.length - 1
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: STEPS[step] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: step / (STEPS.length - 1) * 100 })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepYou, {
						data,
						patch
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepWhere, {
						data,
						patch
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepWhen, {
						data,
						patch,
						windowChoices
					}),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPractice, {
						data,
						patch
					}),
					step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPay, {
						data,
						patch
					}),
					step === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepStudio, {
						data,
						patch
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-destructive",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: () => setStep((s) => s - 1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: next,
					disabled: mutation.isPending,
					className: "min-w-36",
					children: [step === STEPS.length - 1 ? mutation.isPending ? "Sending…" : "Send to Nila" : "Continue", step < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })]
				})]
			})
		] })
	});
}
function Welcome({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col justify-center py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.2em] text-primary uppercase",
				children: "Nila Yoga"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-medium sm:text-5xl",
				children: "True Yoga closed. The practice doesn’t have to."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-prose text-muted-foreground",
				children: "Nila is building her own small-group classes from the students who already know her. This is not a mailing list. Tell her where you live, when you can actually come, and what you’d pay — and she will rent a studio around that, not the other way around."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-6 space-y-2 text-sm text-ink-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "About four minutes. First name only — she already has the student group." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Honest answers beat polite ones. Flexibility and price matter." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Nothing is booked until a cluster is large enough to cover rent." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: onStart,
				size: "lg",
				className: "mt-8 w-full sm:w-auto",
				children: ["Start the form", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})
		]
	});
}
function StepYou({ data, patch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-medium",
				children: "Who’s filling this in?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Use the name Nila knows you by in class. Follow-up stays in her existing student WhatsApp group — this form is for planning, not collecting numbers."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "firstName",
					children: "First name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "firstName",
					autoComplete: "given-name",
					value: data.firstName,
					onChange: (e) => patch({ firstName: e.target.value }),
					placeholder: "Mei"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Were you taking Nila’s class at True Yoga?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					options: [{
						id: "yes",
						label: "Yes — I’m already her student"
					}, {
						id: "no",
						label: "Not yet, but I want to join"
					}],
					value: data.trueYogaStudent ? "yes" : "no",
					onChange: (v) => patch({ trueYogaStudent: v === "yes" }),
					columns: "stack"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Where do you live?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					options: AREAS,
					value: data.liveArea,
					onChange: (v) => patch({ liveArea: v })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Where do you work? (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					options: [{
						id: "",
						label: "I work from home / skip"
					}, ...AREAS],
					value: data.workArea,
					onChange: (v) => patch({ workArea: v })
				})]
			})
		]
	});
}
function StepWhere({ data, patch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-medium",
				children: "Where would you actually go?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Pick every neighbourhood you’d attend a class in — home, work, or a convenient MRT."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
				multiple: true,
				options: AREAS,
				value: data.convenientAreas,
				onChange: (v) => patch({ convenientAreas: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "How far will you travel for Nila?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					columns: "stack",
					options: TRAVEL,
					value: data.travel,
					onChange: (v) => patch({ travel: v })
				})]
			})
		]
	});
}
function StepWhen({ data, patch, windowChoices }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-medium",
				children: "When can you show up?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Be realistic. A Friday you miss twice a month should not look like a sure thing."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Days" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					multiple: true,
					options: DAYS,
					value: data.preferredDays,
					onChange: (v) => patch({ preferredDays: v })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Time of day" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					multiple: true,
					options: TIME_BUCKETS,
					value: data.preferredTimes,
					onChange: (v) => {
						const times = v;
						const allowed = new Set(TIME_WINDOWS.filter((w) => times.includes(w.bucket)).map((w) => w.id));
						patch({
							preferredTimes: times,
							timeWindows: data.timeWindows.filter((id) => allowed.has(id))
						});
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Specific windows" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					multiple: true,
					options: windowChoices,
					value: data.timeWindows,
					onChange: (v) => patch({ timeWindows: v })
				})]
			})
		]
	});
}
function StepPractice({ data, patch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-medium",
				children: "What do you want to practise?"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
				multiple: true,
				options: CLASS_TYPES,
				value: data.classTypes,
				onChange: (v) => patch({ classTypes: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "How often, realistically?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					columns: "stack",
					options: FREQUENCIES,
					value: data.frequency,
					onChange: (v) => patch({ frequency: v })
				})]
			})
		]
	});
}
function StepPay({ data, patch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-medium",
				children: "What would you actually pay?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Two numbers. The first is what feels fair. The second is what you’d commit this month — that’s the one Nila will plan rent around."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricePicker, {
				label: "Feels fair for 60 minutes with Nila",
				value: data.statedPrice,
				onChange: (statedPrice) => patch({ statedPrice })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricePicker, {
				label: "I would actually buy at this price, now",
				value: data.commitPrice,
				onChange: (commitPrice) => patch({ commitPrice })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "How would you like to pay?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					multiple: true,
					columns: "stack",
					options: PACKAGES,
					value: data.packages,
					onChange: (v) => patch({ packages: v })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Commitment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					columns: "stack",
					options: COMMIT_STYLES,
					value: data.commitmentStyle,
					onChange: (v) => patch({ commitmentStyle: v })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "If you miss your usual class" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
					columns: "stack",
					options: MAKEUP,
					value: data.makeup,
					onChange: (v) => patch({ makeup: v })
				})]
			})
		]
	});
}
function StepStudio({ data, patch }) {
	function toggle(id) {
		const set = new Set(data.studioPriorities);
		if (set.has(id)) set.delete(id);
		else if (set.size < 3) set.add(id);
		patch({ studioPriorities: [...set] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl font-medium",
			children: "What matters in the room?"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Pick up to three."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
			children: PRIORITIES.map((p) => {
				const on = data.studioPriorities.includes(p.id);
				const full = !on && data.studioPriorities.length >= 3;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: full,
					onClick: () => toggle(p.id),
					className: cn("min-h-11 rounded-lg px-3.5 py-3 text-left text-sm font-medium transition-colors duration-150", on ? "bg-primary text-primary-foreground" : "bg-card shadow-card", full && "opacity-40"),
					children: p.label
				}, p.id);
			})
		})]
	});
}
function PricePicker({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
			label,
			" — ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums",
				children: ["S$", value]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				15,
				18,
				20,
				22,
				25,
				28,
				30
			].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(n),
				className: cn("h-11 min-w-14 rounded-md px-3 text-sm font-medium tabular-nums transition-colors duration-150", n === value ? "bg-primary text-primary-foreground" : "bg-card shadow-card"),
				children: n
			}, n))
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		current: "survey",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurveyForm, {})
	});
}
//#endregion
export { Home as component };
