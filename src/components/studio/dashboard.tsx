import { useQuery } from "@tanstack/react-query";
import { Copy, MapPin } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AreaBars, ClassBars, PriceBars } from "@/components/studio/charts";
import { Heatmap } from "@/components/studio/heatmap";
import { ScenarioLab, type ScenarioDraft } from "@/components/studio/scenario-lab";
import { StudentTable } from "@/components/studio/student-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  areaDemand,
  buildInsights,
  classDemand,
  clusterCounts,
  currentPlanScore,
  heatmap,
  priceCurve,
  rankSlots,
  slotTitle,
} from "@/lib/nila/analysis";
import {
  AREA_BY_ID,
  DEFAULT_SETTINGS,
  HUBS,
  type AreaId,
  type StudioSettings,
} from "@/lib/nila/constants";
import { listResponses } from "@/lib/nila/server";
import { formatSgd } from "@/lib/utils";

const NILA_PLAN: ScenarioDraft = {
  label: "Nila’s current plan",
  area: "tampines",
  day: "fri",
  window: "0900",
  classType: "hatha",
};

export function StudioDashboard() {
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["responses"],
    queryFn: () => listResponses(),
  });
  const [settings, setSettings] = useState<StudioSettings>(DEFAULT_SETTINGS);
  const [draft, setDraft] = useState<ScenarioDraft>(NILA_PLAN);
  const [heatArea, setHeatArea] = useState<AreaId | "all">("all");
  const [tab, setTab] = useState("slots");

  const ranked = useMemo(() => rankSlots(students, settings), [students, settings]);
  const top = ranked.slice(0, 6);
  const current = useMemo(() => currentPlanScore(students, settings), [students, settings]);
  const insights = useMemo(() => buildInsights(students, ranked), [students, ranked]);
  const areas = useMemo(() => areaDemand(students), [students]);
  const classes = useMemo(() => classDemand(students), [students]);
  const prices = useMemo(() => priceCurve(students), [students]);
  const clusters = useMemo(() => clusterCounts(students), [students]);
  const heat = useMemo(
    () => heatmap(students, heatArea === "all" ? undefined : heatArea),
    [students, heatArea],
  );
  const alumni = students.filter((s) => s.trueYogaStudent).length;
  const flexible = students.filter((s) => s.commitmentStyle === "flexible").length;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-muted-foreground">
        Reading the community…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">Studio</p>
          <h1 className="mt-2 font-display text-4xl font-medium">Demand, then a room.</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Work backwards from Nila’s students. Share the form, watch clusters form, then rent a
            studio only when a slot covers the landlord.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            const url = `${window.location.origin}/`;
            await navigator.clipboard.writeText(url);
            toast.success("Student form link copied.");
          }}
        >
          <Copy className="size-4" />
          Copy student form
        </Button>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="In the community" value={String(students.length)} hint={`${alumni} from True Yoga`} />
        <Kpi
          label="East / NE / Central"
          value={clusters.map((c) => c.count).join(" · ")}
          hint="Live-here clusters"
        />
        <Kpi label="Prefer flexible packs" value={`${flexible}`} hint="Not an 8-week lock-in" />
        <Kpi
          label="Viable slots now"
          value={String(ranked.filter((s) => s.viableHybrid).length)}
          hint={`At ${formatSgd(settings.price)}, min ${settings.minStudents}`}
        />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Launch sequence</CardTitle>
          <CardDescription>
            Don’t fill one large class. Grow three small groups if the numbers hold.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-3">
          {insights.map((insight) => (
            <div key={insight.title} className="rounded-lg bg-paper-deep p-4">
              <Badge variant={insight.tone === "go" ? "sage" : insight.tone === "warn" ? "warn" : "muted"}>
                {insight.tone === "go" ? "Do this" : insight.tone === "warn" ? "Watch" : "Note"}
              </Badge>
              <p className="mt-3 font-medium">{insight.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{insight.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={setTab} className="mt-8">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 sm:w-auto">
          <TabsTrigger value="slots">Viable classes</TabsTrigger>
          <TabsTrigger value="map">Where & when</TabsTrigger>
          <TabsTrigger value="price">Pricing</TabsTrigger>
          <TabsTrigger value="lab">Scenario lab</TabsTrigger>
          <TabsTrigger value="people">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="slots" className="space-y-4">
          <SlotCompare current={current} settings={settings} />
          <div className="grid gap-3 md:grid-cols-2">
            {top.map((slot) => (
              <button
                key={`${slot.area}-${slot.day}-${slot.window}-${slot.classType}`}
                type="button"
                className="rounded-xl bg-card p-5 text-left shadow-card transition-transform duration-150 hover:-translate-y-0.5"
                onClick={() => {
                  setDraft({
                    label: "From demand list",
                    area: slot.area,
                    day: slot.day,
                    window: slot.window,
                    classType: slot.classType,
                  });
                  setTab("lab");
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {AREA_BY_ID[slot.area]?.label}
                    </p>
                    <p className="mt-1 font-display text-xl font-medium">{slotTitle(slot)}</p>
                  </div>
                  <Badge variant={slot.viableHybrid ? "sage" : "warn"}>
                    {slot.viableHybrid ? "Viable" : "Thin"}
                  </Badge>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-sm tabular-nums sm:grid-cols-4">
                  <Mini k="Interested" v={slot.interested} />
                  <Mini k="Would pay" v={slot.committable} />
                  <Mini k="8-week" v={slot.programmeHeads} />
                  <Mini
                    k="Hybrid"
                    v={formatSgd(slot.hybridContribution)}
                    good={slot.hybridContribution >= 0}
                  />
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">
                  Rent {formatSgd(slot.rental)} · {slot.studio} studio · opens in the lab
                </p>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Day × time</CardTitle>
              <CardDescription>
                How many students said they could come. Tap a cell to open the lab.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                <HubChip active={heatArea === "all"} onClick={() => setHeatArea("all")}>
                  All areas
                </HubChip>
                {HUBS.map((h) => (
                  <HubChip
                    key={h.id}
                    active={heatArea === h.id}
                    onClick={() => setHeatArea(h.id)}
                  >
                    {h.label}
                  </HubChip>
                ))}
              </div>
              <Heatmap
                cells={heat}
                onPick={(day, window) => {
                  setDraft((d) => ({
                    ...d,
                    label: "From heatmap",
                    day,
                    window,
                    area: heatArea === "all" ? d.area : heatArea,
                  }));
                  setTab("lab");
                }}
              />
            </CardContent>
          </Card>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Where they live vs where they’d go</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaBars data={areas} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Class interest</CardTitle>
              </CardHeader>
              <CardContent>
                <ClassBars data={classes} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="price" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stated price vs committed price</CardTitle>
              <CardDescription>
                The left bar is what feels fair. The right bar is who would actually buy. Plan rent
                on the right bar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PriceBars data={prices} />
            </CardContent>
          </Card>
          <div className="grid gap-3 sm:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground">4-class pack at S$18</p>
                <p className="mt-1 font-display text-2xl tabular-nums">S$72</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Converts more people. Four weeks of rent still costs {formatSgd(settings.smallRental * 4)}.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground">8-class pack at S$18</p>
                <p className="mt-1 font-display text-2xl tabular-nums">S$144</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Covers eight hours of rent once {Math.ceil((settings.smallRental * 8) / (18 * 8))}{" "}
                  people buy — but fewer will lock the dates.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground">Makeup across Nila’s classes</p>
                <p className="mt-1 font-display text-2xl">Keep the pack</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Predictable income without trapping people on Friday morning. Empty Friday spots
                  can be filled from another group.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lab">
          <ScenarioLab
            students={students}
            settings={settings}
            onSettings={setSettings}
            draft={draft}
            onDraft={setDraft}
          />
        </TabsContent>

        <TabsContent value="people">
          <StudentTable students={students} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-3xl font-medium tabular-nums">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

function Mini({ k, v, good }: { k: string; v: string | number; good?: boolean }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{k}</p>
      <p className={`font-medium tabular-nums ${good === false ? "text-destructive" : ""}`}>{v}</p>
    </div>
  );
}

function HubChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground"
          : "h-9 rounded-md bg-muted px-3 text-sm"
      }
    >
      {children}
    </button>
  );
}

function SlotCompare({
  current,
  settings,
}: {
  current: ReturnType<typeof currentPlanScore>;
  settings: StudioSettings;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nila’s current plan, scored</CardTitle>
        <CardDescription>
          Friday 9:00 Hatha in Tampines · {formatSgd(settings.price)} · {settings.sessions} sessions
          · small studio {formatSgd(settings.smallRental)}/hr
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs text-muted-foreground">Interested / would pay / 8-week</p>
          <p className="mt-1 font-display text-2xl tabular-nums">
            {current.interested} · {current.committable} · {current.programmeHeads}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Programme contribution</p>
          <p className="mt-1 font-display text-2xl tabular-nums">
            {formatSgd(current.programmeContribution)}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatSgd(current.split.programmeRevenue)} in − {formatSgd(current.rental)} rent
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">If packs stay flexible</p>
          <p className="mt-1 font-display text-2xl tabular-nums">
            {formatSgd(current.hybridContribution)}
          </p>
          <p className="text-xs text-muted-foreground">
            Same rent. Revenue only from classes people actually buy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
