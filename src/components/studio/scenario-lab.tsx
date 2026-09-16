import { useMemo, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  CLASS_TYPES,
  DAYS,
  HUBS,
  TIME_WINDOWS,
  type AreaId,
  type ClassId,
  type DayId,
  type StudioSettings,
  type WindowId,
} from "@/lib/nila/constants";
import { scoreSlot, slotTitle } from "@/lib/nila/analysis";
import type { SlotKey, Student } from "@/lib/nila/types";
import { formatSgd } from "@/lib/utils";

export type ScenarioDraft = SlotKey & { label: string };

export function ScenarioLab({
  students,
  settings,
  onSettings,
  draft,
  onDraft,
}: {
  students: Student[];
  settings: StudioSettings;
  onSettings: (next: StudioSettings) => void;
  draft: ScenarioDraft;
  onDraft: (next: ScenarioDraft) => void;
}) {
  const score = useMemo(
    () => scoreSlot(students, draft, settings),
    [students, draft, settings],
  );

  const breakEven = Math.ceil(settings.smallRental / Math.max(settings.price, 1));

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <Card>
        <CardHeader>
          <CardTitle>Build a class</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Field label="Location">
            <Select
              value={draft.area}
              onChange={(area) => onDraft({ ...draft, area: area as AreaId })}
              options={HUBS.map((h) => ({ id: h.id, label: h.label }))}
            />
          </Field>
          <Field label="Day">
            <Select
              value={draft.day}
              onChange={(day) => onDraft({ ...draft, day: day as DayId })}
              options={DAYS.map((d) => ({ id: d.id, label: d.label }))}
            />
          </Field>
          <Field label="Time">
            <Select
              value={draft.window}
              onChange={(window) => onDraft({ ...draft, window: window as WindowId })}
              options={TIME_WINDOWS.map((w) => ({ id: w.id, label: w.label }))}
            />
          </Field>
          <Field label="Class">
            <Select
              value={draft.classType}
              onChange={(classType) => onDraft({ ...draft, classType: classType as ClassId })}
              options={CLASS_TYPES.map((c) => ({ id: c.id, label: c.label }))}
            />
          </Field>
          <Field label={`Price per class · ${formatSgd(settings.price)}`}>
            <Slider
              min={15}
              max={30}
              step={1}
              value={[settings.price]}
              onValueChange={(value) =>
                onSettings({ ...settings, price: value[0] ?? settings.price })
              }
            />
          </Field>
          <Field label={`Programme length · ${settings.sessions} sessions`}>
            <Slider
              min={4}
              max={12}
              step={1}
              value={[settings.sessions]}
              onValueChange={(value) =>
                onSettings({ ...settings, sessions: value[0] ?? settings.sessions })
              }
            />
          </Field>
          <Field label={`Small studio rent · ${formatSgd(settings.smallRental)}/hr`}>
            <Slider
              min={60}
              max={180}
              step={10}
              value={[settings.smallRental]}
              onValueChange={(value) =>
                onSettings({ ...settings, smallRental: value[0] ?? settings.smallRental })
              }
            />
          </Field>
          <Field label={`Need at least ${settings.minStudents} paying students`}>
            <Slider
              min={6}
              max={16}
              step={1}
              value={[settings.minStudents]}
              onValueChange={(value) =>
                onSettings({ ...settings, minStudents: value[0] ?? settings.minStudents })
              }
            />
          </Field>
          <p className="text-xs text-muted-foreground">
            Break-even on rent alone is {breakEven} students at {formatSgd(settings.price)} in a
            small studio. Empty spots still pay the landlord.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div>
            <CardTitle>{slotTitle(score)}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{draft.label}</p>
          </div>
          <Badge variant={score.viableHybrid ? "sage" : "warn"}>
            {score.viableHybrid ? "Covers rent" : "Not yet"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat n={score.interested} label="Interested" />
            <Stat n={score.committable} label={`Pay ${formatSgd(settings.price)}`} />
            <Stat n={score.programmeHeads} label="8-week lock-in" />
            <Stat
              n={score.studio === "large" ? settings.largeRental : settings.smallRental}
              label={`${score.studio} studio /hr`}
              money
            />
          </div>

          <div className="rounded-lg bg-paper-deep p-4">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              If Nila runs {settings.sessions} weekly hours
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <MoneyRow
                title="Closed 8-session programme"
                revenue={score.split.programmeRevenue}
                rent={score.rental}
                contribution={score.programmeContribution}
                detail={`${score.programmeHeads} students × ${settings.sessions} × ${formatSgd(settings.price)}`}
              />
              <MoneyRow
                title="Flexible packs (blended)"
                revenue={score.split.hybridRevenue}
                rent={score.rental}
                contribution={score.hybridContribution}
                detail={`${score.split.eightPackHeads + score.split.monthlyHeads} on 8s, ${score.split.fourPackHeads} on 4s, ${score.split.dropinHeads} drop-in. Rent is still ${settings.sessions} hours.`}
              />
            </div>
          </div>

          {score.names.length > 0 ? (
            <p className="text-sm text-muted-foreground">
              In the pool: {score.names.slice(0, 14).join(", ")}
              {score.names.length > 14 ? ` +${score.names.length - 14}` : ""}.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No one in this combination yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Stat({ n, label, money }: { n: number; label: string; money?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/70 p-3">
      <p className="font-display text-2xl font-medium tabular-nums">
        {money ? formatSgd(n) : n}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function MoneyRow({
  title,
  revenue,
  rent,
  contribution,
  detail,
}: {
  title: string;
  revenue: number;
  rent: number;
  contribution: number;
  detail: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      <dl className="mt-2 space-y-1 text-sm tabular-nums">
        <div className="flex justify-between">
          <dt>Revenue</dt>
          <dd>{formatSgd(revenue)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Studio rent</dt>
          <dd>{formatSgd(rent)}</dd>
        </div>
        <div className="flex justify-between font-medium">
          <dt>Gross contribution</dt>
          <dd className={contribution >= 0 ? "text-primary" : "text-destructive"}>
            {formatSgd(contribution)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
