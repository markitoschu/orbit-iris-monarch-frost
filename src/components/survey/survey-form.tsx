import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChoiceGroup } from "@/components/choice-group";
import {
  AREAS,
  CLASS_TYPES,
  DAYS,
  WEEKDAY_SLOTS,
  WEEKEND_SLOTS,
} from "@/lib/nila/constants";
import { submitResponse } from "@/lib/nila/server";
import type { SurveyInput } from "@/lib/nila/types";

const STEPS = ["Welcome", "About you", "When & what"] as const;

const empty: SurveyInput = {
  name: "",
  contactNumber: "",
  locationPreference: "tampines",
  availability: {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  },
  classTypes: [],
};

// Keep only digits, max 8. If someone pastes "+65 8123 4567",
// the leading 65 is dropped automatically.
function normalizeSgPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("65")) digits = digits.slice(2);
  return digits.slice(0, 8);
}

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
      setDone({ name: data.name.trim(), total: res.total });
    },
    onError: () => {
      toast.error("Could not save your answers. Please try again.");
    },
  });

  function patch(partial: Partial<SurveyInput>) {
    setData((prev) => ({ ...prev, ...partial }));
    setError("");
  }

  function validate(): string | null {
    if (step === 1) {
      if (!data.name.trim()) return "Please enter your name.";
      if (!data.contactNumber.trim()) return "Please enter your contact number.";
      if (!data.locationPreference) return "Please select a location.";
    }
    if (step === 2) {
      const hasAnyAvailability = Object.values(data.availability).some((slots) => slots.length > 0);
      if (!hasAnyAvailability) return "Please select at least one time slot.";
      if (data.classTypes.length === 0) return "Please select at least one class type.";
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
          You're one of {done.total} people helping Nila serve you better. She'll be in touch soon.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
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
            {step === 1 && <StepAboutYou data={data} patch={patch} />}
            {step === 2 && <StepWhenAndWhat data={data} patch={patch} />}
          </div>

          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 1}>
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
        Nila is collecting data from her members.
      </h1>
      <p className="mt-5 max-w-prose text-muted-foreground">
        Nila wants to understand your preferences and serve you better. Tell her when you're free, what you want to practise, and how to reach you. She'll build classes around your availability.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        <li>Two minutes. Your contact info helps Nila reach out.</li>
        <li>Honest answers help. Pick the times you'll actually show up.</li>
        <li>Classes launch when there's enough demand.</li>
      </ul>
      <Button onClick={onStart} size="lg" className="mt-8 w-full sm:w-auto">
        Start
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

function StepAboutYou({
  data,
  patch,
}: {
  data: SurveyInput;
  patch: (p: Partial<SurveyInput>) => void;
}) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl font-medium">Who's this for?</h2>
      </header>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          autoComplete="given-name"
          value={data.name}
          onChange={(e) => patch({ name: e.target.value })}
          placeholder="Mei"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Mobile number</Label>
        <Input
          id="contact"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={data.contactNumber}
          onChange={(e) => {
            const digits = normalizeSgPhone(e.target.value);
            e.target.value = digits;
            patch({ contactNumber: digits });
          }}
          placeholder="8123 4567"
        />
        <p className="text-xs text-muted-foreground">
          8 digits, starts with 8 or 9 — no +65 needed.
        </p>
      </div>

      <div className="space-y-2">
        <Label>What's your location preference?</Label>
        <ChoiceGroup
          options={AREAS}
          value={data.locationPreference}
          onChange={(v) => patch({ locationPreference: v as SurveyInput["locationPreference"] })}
        />
      </div>
    </div>
  );
}

function StepWhenAndWhat({
  data,
  patch,
}: {
  data: SurveyInput;
  patch: (p: Partial<SurveyInput>) => void;
}) {
  function toggleAvailability(day: string, slot: string) {
    patch({
      availability: {
        ...data.availability,
        [day]: data.availability[day].includes(slot)
          ? data.availability[day].filter((s) => s !== slot)
          : [...data.availability[day], slot],
      },
    });
  }

  const isWeekend = (day: string) => day === "sat" || day === "sun";

  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-display text-3xl font-medium">When can you come?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select all the time slots when you're typically free. You can choose multiple per day, or skip days entirely.
        </p>
      </header>

      {/* Availability by day */}
      <div className="space-y-6">
        {DAYS.map((day) => (
          <div key={day.id} className="space-y-2">
            <Label className="text-base font-medium">{day.label}</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {isWeekend(day.id) ? (
                WEEKEND_SLOTS.map((slot) => (
                  <SlotButton
                    key={slot.id}
                    label={slot.label}
                    selected={data.availability[day.id].includes(slot.id)}
                    period={slot.period}
                    onClick={() => toggleAvailability(day.id, slot.id)}
                  />
                ))
              ) : (
                WEEKDAY_SLOTS.map((slot) => (
                  <SlotButton
                    key={slot.id}
                    label={slot.label}
                    selected={data.availability[day.id].includes(slot.id)}
                    period={slot.period}
                    onClick={() => toggleAvailability(day.id, slot.id)}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>What would you like to practise?</Label>
        <ChoiceGroup
          multiple
          options={CLASS_TYPES}
          value={data.classTypes}
          onChange={(v) => patch({ classTypes: v as SurveyInput["classTypes"] })}
        />
      </div>
    </div>
  );
}

function SlotButton({
  label,
  selected,
  period,
  onClick,
}: {
  label: string;
  selected: boolean;
  period: string;
  onClick: () => void;
}) {
  const isWarmPeriod = period === "morning" || period === "afternoon";
  const bgColor = isWarmPeriod ? "bg-amber-100" : "bg-blue-100";
  const selectedBgColor = isWarmPeriod ? "bg-amber-500" : "bg-blue-500";
  const selectedTextColor = "text-white";
  const unselectedTextColor = isWarmPeriod ? "text-amber-900" : "text-blue-900";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        selected
          ? `${selectedBgColor} ${selectedTextColor}`
          : `${bgColor} ${unselectedTextColor}`
      }`}
    >
      {label}
    </button>
  );
}
