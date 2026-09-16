import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ChoiceGroup } from "@/components/choice-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  AREAS,
  CLASS_TYPES,
  COMMIT_STYLES,
  DAYS,
  FREQUENCIES,
  MAKEUP,
  PACKAGES,
  PRIORITIES,
  TIME_BUCKETS,
  TIME_WINDOWS,
  TRAVEL,
} from "@/lib/nila/constants";
import { submitResponse } from "@/lib/nila/server";
import type { SurveyInput } from "@/lib/nila/types";
import { cn } from "@/lib/utils";

const STEPS = [
  "Welcome",
  "You",
  "Where",
  "When",
  "Practice",
  "Paying",
  "Studio",
] as const;

const empty: SurveyInput = {
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
  trueYogaStudent: true,
};

export function SurveyForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyInput>(empty);
  const [done, setDone] = useState<{ name: string; total: number } | null>(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: SurveyInput) => submitResponse({ data: payload }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["responses"] });
      setDone({ name: data.firstName.trim(), total: res.total });
    },
    onError: () => {
      toast.error("Could not save your answers. Please try again.");
    },
  });

  const windowChoices = useMemo(() => {
    if (data.preferredTimes.length === 0) return [...TIME_WINDOWS];
    return TIME_WINDOWS.filter((w) => data.preferredTimes.includes(w.bucket));
  }, [data.preferredTimes]);

  function patch(partial: Partial<SurveyInput>) {
    setData((prev) => ({ ...prev, ...partial }));
    setError("");
  }

  function validate(): string | null {
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

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:py-24">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">Received</p>
        <h1 className="mt-3 font-display text-4xl font-medium">Thank you, {done.name}.</h1>
        <p className="mt-4 text-muted-foreground">
          You’re one of {done.total} people helping Nila choose where, when, and how to teach —
          working backwards from this community, not from an empty studio.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/studio">See the studio view</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setDone(null);
              setData(empty);
              setStep(0);
            }}
          >
            Add another person
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-xl flex-col px-4 py-8 sm:py-12">
      {step === 0 ? (
        <Welcome onStart={() => setStep(1)} />
      ) : (
        <>
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <span>
                {step} of {STEPS.length - 1}
              </span>
              <span>{STEPS[step]}</span>
            </div>
            <Progress value={(step / (STEPS.length - 1)) * 100} />
          </div>

          <div className="flex-1">
            {step === 1 && <StepYou data={data} patch={patch} />}
            {step === 2 && <StepWhere data={data} patch={patch} />}
            {step === 3 && (
              <StepWhen data={data} patch={patch} windowChoices={windowChoices} />
            )}
            {step === 4 && <StepPractice data={data} patch={patch} />}
            {step === 5 && <StepPay data={data} patch={patch} />}
            {step === 6 && <StepStudio data={data} patch={patch} />}
          </div>

          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <Button onClick={next} disabled={mutation.isPending} className="min-w-36">
              {step === STEPS.length - 1
                ? mutation.isPending
                  ? "Sending…"
                  : "Send to Nila"
                : "Continue"}
              {step < STEPS.length - 1 ? <ArrowRight className="size-4" /> : <Check className="size-4" />}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-center py-6">
      <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Nila Yoga</p>
      <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
        True Yoga closed. The practice doesn’t have to.
      </h1>
      <p className="mt-5 max-w-prose text-muted-foreground">
        Nila is building her own small-group classes from the students who already know her. This
        is not a mailing list. Tell her where you live, when you can actually come, and what you’d
        pay — and she will rent a studio around that, not the other way around.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-ink-soft">
        <li>About four minutes. First name only — she already has the student group.</li>
        <li>Honest answers beat polite ones. Flexibility and price matter.</li>
        <li>Nothing is booked until a cluster is large enough to cover rent.</li>
      </ul>
      <Button onClick={onStart} size="lg" className="mt-8 w-full sm:w-auto">
        Start the form
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

function StepYou({
  data,
  patch,
}: {
  data: SurveyInput;
  patch: (p: Partial<SurveyInput>) => void;
}) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl font-medium">Who’s filling this in?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the name Nila knows you by in class. Follow-up stays in her existing student WhatsApp
          group — this form is for planning, not collecting numbers.
        </p>
      </header>
      <div className="space-y-2">
        <Label htmlFor="firstName">First name</Label>
        <Input
          id="firstName"
          autoComplete="given-name"
          value={data.firstName}
          onChange={(e) => patch({ firstName: e.target.value })}
          placeholder="Mei"
        />
      </div>
      <div className="space-y-2">
        <Label>Were you taking Nila’s class at True Yoga?</Label>
        <ChoiceGroup
          options={[
            { id: "yes", label: "Yes — I’m already her student" },
            { id: "no", label: "Not yet, but I want to join" },
          ]}
          value={data.trueYogaStudent ? "yes" : "no"}
          onChange={(v) => patch({ trueYogaStudent: v === "yes" })}
          columns="stack"
        />
      </div>
      <div className="space-y-2">
        <Label>Where do you live?</Label>
        <ChoiceGroup
          options={AREAS}
          value={data.liveArea}
          onChange={(v) => patch({ liveArea: v as SurveyInput["liveArea"] })}
        />
      </div>
      <div className="space-y-2">
        <Label>Where do you work? (optional)</Label>
        <ChoiceGroup
          options={[{ id: "", label: "I work from home / skip" }, ...AREAS]}
          value={data.workArea}
          onChange={(v) => patch({ workArea: v as SurveyInput["workArea"] })}
        />
      </div>
    </div>
  );
}

function StepWhere({
  data,
  patch,
}: {
  data: SurveyInput;
  patch: (p: Partial<SurveyInput>) => void;
}) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl font-medium">Where would you actually go?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick every neighbourhood you’d attend a class in — home, work, or a convenient MRT.
        </p>
      </header>
      <ChoiceGroup
        multiple
        options={AREAS}
        value={data.convenientAreas}
        onChange={(v) => patch({ convenientAreas: v as SurveyInput["convenientAreas"] })}
      />
      <div className="space-y-2">
        <Label>How far will you travel for Nila?</Label>
        <ChoiceGroup
          columns="stack"
          options={TRAVEL}
          value={data.travel}
          onChange={(v) => patch({ travel: v as SurveyInput["travel"] })}
        />
      </div>
    </div>
  );
}

function StepWhen({
  data,
  patch,
  windowChoices,
}: {
  data: SurveyInput;
  patch: (p: Partial<SurveyInput>) => void;
  windowChoices: readonly { id: string; label: string }[];
}) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl font-medium">When can you show up?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Be realistic. A Friday you miss twice a month should not look like a sure thing.
        </p>
      </header>
      <div className="space-y-2">
        <Label>Days</Label>
        <ChoiceGroup
          multiple
          options={DAYS}
          value={data.preferredDays}
          onChange={(v) => patch({ preferredDays: v as SurveyInput["preferredDays"] })}
        />
      </div>
      <div className="space-y-2">
        <Label>Time of day</Label>
        <ChoiceGroup
          multiple
          options={TIME_BUCKETS}
          value={data.preferredTimes}
          onChange={(v) => {
            const times = v as SurveyInput["preferredTimes"];
            const allowed = new Set(
              TIME_WINDOWS.filter((w) => times.includes(w.bucket)).map((w) => w.id),
            );
            patch({
              preferredTimes: times,
              timeWindows: data.timeWindows.filter((id) => allowed.has(id)),
            });
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Specific windows</Label>
        <ChoiceGroup
          multiple
          options={windowChoices}
          value={data.timeWindows}
          onChange={(v) => patch({ timeWindows: v as SurveyInput["timeWindows"] })}
        />
      </div>
    </div>
  );
}

function StepPractice({
  data,
  patch,
}: {
  data: SurveyInput;
  patch: (p: Partial<SurveyInput>) => void;
}) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl font-medium">What do you want to practise?</h2>
      </header>
      <ChoiceGroup
        multiple
        options={CLASS_TYPES}
        value={data.classTypes}
        onChange={(v) => patch({ classTypes: v as SurveyInput["classTypes"] })}
      />
      <div className="space-y-2">
        <Label>How often, realistically?</Label>
        <ChoiceGroup
          columns="stack"
          options={FREQUENCIES}
          value={data.frequency}
          onChange={(v) => patch({ frequency: v as SurveyInput["frequency"] })}
        />
      </div>
    </div>
  );
}

function StepPay({
  data,
  patch,
}: {
  data: SurveyInput;
  patch: (p: Partial<SurveyInput>) => void;
}) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl font-medium">What would you actually pay?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Two numbers. The first is what feels fair. The second is what you’d commit this month —
          that’s the one Nila will plan rent around.
        </p>
      </header>
      <PricePicker
        label="Feels fair for 60 minutes with Nila"
        value={data.statedPrice}
        onChange={(statedPrice) => patch({ statedPrice })}
      />
      <PricePicker
        label="I would actually buy at this price, now"
        value={data.commitPrice}
        onChange={(commitPrice) => patch({ commitPrice })}
      />
      <div className="space-y-2">
        <Label>How would you like to pay?</Label>
        <ChoiceGroup
          multiple
          columns="stack"
          options={PACKAGES}
          value={data.packages}
          onChange={(v) => patch({ packages: v as SurveyInput["packages"] })}
        />
      </div>
      <div className="space-y-2">
        <Label>Commitment</Label>
        <ChoiceGroup
          columns="stack"
          options={COMMIT_STYLES}
          value={data.commitmentStyle}
          onChange={(v) => patch({ commitmentStyle: v as SurveyInput["commitmentStyle"] })}
        />
      </div>
      <div className="space-y-2">
        <Label>If you miss your usual class</Label>
        <ChoiceGroup
          columns="stack"
          options={MAKEUP}
          value={data.makeup}
          onChange={(v) => patch({ makeup: v as SurveyInput["makeup"] })}
        />
      </div>
    </div>
  );
}

function StepStudio({
  data,
  patch,
}: {
  data: SurveyInput;
  patch: (p: Partial<SurveyInput>) => void;
}) {
  function toggle(id: SurveyInput["studioPriorities"][number]) {
    const set = new Set(data.studioPriorities);
    if (set.has(id)) set.delete(id);
    else if (set.size < 3) set.add(id);
    patch({ studioPriorities: [...set] });
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl font-medium">What matters in the room?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Pick up to three.</p>
      </header>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {PRIORITIES.map((p) => {
          const on = data.studioPriorities.includes(p.id);
          const full = !on && data.studioPriorities.length >= 3;
          return (
            <button
              key={p.id}
              type="button"
              disabled={full}
              onClick={() => toggle(p.id)}
              className={cn(
                "min-h-11 rounded-lg px-3.5 py-3 text-left text-sm font-medium transition-colors duration-150",
                on ? "bg-primary text-primary-foreground" : "bg-card shadow-card",
                full && "opacity-40",
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PricePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  const options = [15, 18, 20, 22, 25, 28, 30];
  return (
    <div className="space-y-2">
      <Label>
        {label} — <span className="tabular-nums">S${value}</span>
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              "h-11 min-w-14 rounded-md px-3 text-sm font-medium tabular-nums transition-colors duration-150",
              n === value ? "bg-primary text-primary-foreground" : "bg-card shadow-card",
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
