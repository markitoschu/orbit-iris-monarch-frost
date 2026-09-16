import {
  ADJACENT,
  AREA_BY_ID,
  AREAS,
  CLASS_TYPES,
  DAYS,
  DEFAULT_SETTINGS,
  HUBS,
  TIME_WINDOWS,
  type AreaId,
  type ClassId,
  type DayId,
  type StudioSettings,
  type WindowId,
} from "./constants";
import type {
  AreaDemand,
  HeatCell,
  PricePoint,
  RevenueSplit,
  SlotKey,
  SlotScore,
  Student,
} from "./types";

export function areaReachable(student: Student, hub: AreaId): boolean {
  if (student.convenientAreas.includes(hub)) return true;
  if (student.liveArea === hub || student.workArea === hub) return true;
  if (student.travel === "same") return false;
  if (student.travel === "nearby") {
    const near = new Set<string>([
      student.liveArea,
      ...(ADJACENT[student.liveArea] ?? []),
    ]);
    if (student.workArea) {
      near.add(student.workArea);
      for (const a of ADJACENT[student.workArea] ?? []) near.add(a);
    }
    return near.has(hub);
  }
  return true;
}

export function matchesWindow(student: Student, window: WindowId): boolean {
  if (student.timeWindows.includes(window)) return true;
  const bucket = TIME_WINDOWS.find((w) => w.id === window)?.bucket;
  return Boolean(bucket && student.preferredTimes.includes(bucket));
}

export function matchesSlot(student: Student, slot: SlotKey): boolean {
  if (!areaReachable(student, slot.area)) return false;
  if (!student.preferredDays.includes(slot.day)) return false;
  if (!matchesWindow(student, slot.window)) return false;
  if (!student.classTypes.includes(slot.classType)) return false;
  return true;
}

function isCommittable(student: Student, price: number): boolean {
  return student.commitPrice >= price && student.frequency !== "occasional";
}

function programmeEligible(student: Student): boolean {
  if (student.commitmentStyle === "fixed") return true;
  if (student.commitmentStyle === "monthly") return true;
  return student.packages.includes("8pack") || student.packages.includes("monthly");
}

function hybridSessions(student: Student, sessions: number): number {
  if (student.commitmentStyle === "monthly" || student.packages.includes("monthly")) {
    return sessions;
  }
  if (student.commitmentStyle === "fixed" || student.packages.includes("8pack")) {
    return sessions;
  }
  if (student.packages.includes("4pack")) return Math.min(4, sessions);
  if (student.packages.includes("dropin")) return Math.min(2, sessions);
  return Math.min(4, sessions);
}

export function splitRevenue(
  students: Student[],
  price: number,
  sessions: number,
): RevenueSplit {
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
    } else if (s.packages.includes("4pack")) {
      fourPackHeads += 1;
    } else {
      dropinHeads += 1;
    }
  }

  return {
    eightPackHeads,
    fourPackHeads,
    monthlyHeads,
    dropinHeads,
    programmeRevenue,
    hybridRevenue,
    sessionsSoldHybrid,
  };
}

export function scoreSlot(
  responses: Student[],
  slot: SlotKey,
  settings: StudioSettings,
): SlotScore {
  const matching = responses.filter((s) => matchesSlot(s, slot));
  const committable = matching.filter((s) => isCommittable(s, settings.price));
  const programme = committable.filter(programmeEligible);
  const studio: "small" | "large" =
    committable.length >= settings.largeFrom ? "large" : "small";
  const rental =
    (studio === "large" ? settings.largeRental : settings.smallRental) *
    settings.hours *
    settings.sessions;
  const split = splitRevenue(committable, settings.price, settings.sessions);
  const programmeSplit = splitRevenue(programme, settings.price, settings.sessions);
  const programmeContribution = programmeSplit.programmeRevenue - rental;
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
    names: matching.map((s) => s.firstName),
  };
}

export function rankSlots(responses: Student[], settings: StudioSettings): SlotScore[] {
  const out: SlotScore[] = [];
  for (const hub of HUBS) {
    for (const day of DAYS) {
      for (const window of TIME_WINDOWS) {
        for (const cls of CLASS_TYPES) {
          const slot: SlotKey = {
            area: hub.id,
            day: day.id,
            window: window.id,
            classType: cls.id,
          };
          const score = scoreSlot(responses, slot, settings);
          if (score.interested < 4) continue;
          out.push(score);
        }
      }
    }
  }
  out.sort((a, b) => {
    const av = Number(a.viableHybrid) + Number(a.viableProgramme);
    const bv = Number(b.viableHybrid) + Number(b.viableProgramme);
    if (bv !== av) return bv - av;
    if (b.hybridContribution !== a.hybridContribution) {
      return b.hybridContribution - a.hybridContribution;
    }
    if (b.committable !== a.committable) return b.committable - a.committable;
    return b.interested - a.interested;
  });
  return out;
}

export function heatmap(responses: Student[], area?: AreaId): HeatCell[] {
  const pool = area ? responses.filter((s) => areaReachable(s, area)) : responses;
  const cells: HeatCell[] = [];
  for (const day of DAYS) {
    for (const window of TIME_WINDOWS) {
      const count = pool.filter(
        (s) => s.preferredDays.includes(day.id) && matchesWindow(s, window.id),
      ).length;
      cells.push({ day: day.id, window: window.id, count });
    }
  }
  return cells;
}

export function areaDemand(responses: Student[]): AreaDemand[] {
  return AREAS.map((area) => ({
    area: area.id,
    cluster: area.cluster,
    live: responses.filter((s) => s.liveArea === area.id).length,
    convenient: responses.filter((s) => s.convenientAreas.includes(area.id)).length,
  }));
}

export function classDemand(responses: Student[]): { id: ClassId; count: number }[] {
  return CLASS_TYPES.map((c) => ({
    id: c.id,
    count: responses.filter((s) => s.classTypes.includes(c.id)).length,
  })).sort((a, b) => b.count - a.count);
}

export function priceCurve(responses: Student[]): PricePoint[] {
  const prices = [15, 18, 20, 22, 25, 28, 30];
  return prices.map((price) => ({
    price,
    overallCommit: responses.filter((s) => s.commitPrice >= price).length,
    overallStated: responses.filter((s) => s.statedPrice >= price).length,
  }));
}

export function clusterCounts(responses: Student[]): { id: string; label: string; count: number }[] {
  const east = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "east").length;
  const ne = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "northeast").length;
  const central = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "central").length;
  return [
    { id: "east", label: "East", count: east },
    { id: "northeast", label: "North-East", count: ne },
    { id: "central", label: "Central", count: central },
  ];
}

export function slotTitle(slot: SlotKey): string {
  const day = DAYS.find((d) => d.id === slot.day)?.label ?? slot.day;
  const window = TIME_WINDOWS.find((w) => w.id === slot.window)?.label ?? slot.window;
  const area = AREA_BY_ID[slot.area]?.label ?? slot.area;
  const cls = CLASS_TYPES.find((c) => c.id === slot.classType)?.label ?? slot.classType;
  return `${day} ${window} · ${area} · ${cls}`;
}

export type Insight = { title: string; body: string; tone: "go" | "warn" | "note" };

export function buildInsights(responses: Student[], ranked: SlotScore[]): Insight[] {
  const insights: Insight[] = [];
  if (responses.length === 0) {
    return [
      {
        title: "No responses yet",
        body: "Share the student form. Analysis fills in as people reply.",
        tone: "note",
      },
    ];
  }

  const current = ranked.find(
    (s) =>
      s.area === "tampines" &&
      s.day === "fri" &&
      s.window === "0900" &&
      s.classType === "hatha",
  );
  const best = ranked[0];
  const bestProgramme = ranked.find((s) => s.viableProgramme) ?? ranked.find((s) => s.programmeHeads >= 8);

  if (current) {
    if (!current.viableProgramme) {
      insights.push({
        title: "Friday Tampines 8-week lock-in is tight",
        body: `${current.interested} students are interested in Friday 9:00 Hatha in Tampines, but only ${current.programmeHeads} would lock an 8-session programme at the current price. Studio rent is still due for all eight weeks. A flexible pack with makeup keeps ${current.committable} paying students in the pool.`,
        tone: "warn",
      });
    } else {
      insights.push({
        title: "Friday Tampines can work as a programme",
        body: `${current.programmeHeads} students would take a fixed 8-session Hatha. Hybrid contribution ${current.hybridContribution >= 0 ? "covers" : "does not cover"} rent.`,
        tone: "go",
      });
    }
  }

  if (best && best !== current) {
    insights.push({
      title: `Strongest slot: ${slotTitle(best)}`,
      body: `${best.committable} would pay the current price (${best.interested} interested). Hybrid contribution ${best.hybridContribution >= 0 ? "is" : "is not"} positive after ${best.studio} studio rent.`,
      tone: best.viableHybrid ? "go" : "note",
    });
  }

  const flexible = responses.filter((s) => s.commitmentStyle === "flexible").length;
  const fixed = responses.filter((s) => s.commitmentStyle === "fixed").length;
  const makeupNeed = responses.filter((s) => s.makeup === "essential").length;
  insights.push({
    title: "Flexibility is the product, not a perk",
    body: `${flexible} prefer a flexible pack vs ${fixed} who want a fixed programme. ${makeupNeed} say makeup classes are essential. An 8-week closed course will shrink the room; a 4-pack that can be used at another Nila class keeps the community.`,
    tone: "note",
  });

  if (bestProgramme && bestProgramme.classType === "therapy") {
    insights.push({
      title: "Yoga Therapy can be the closed programme",
      body: `${slotTitle(bestProgramme)} already behaves like a course — students accept an 8-session commitment when the work is therapeutic. Run that as a closed group, and keep East morning classes flexible.`,
      tone: "go",
    });
  } else if (bestProgramme) {
    insights.push({
      title: "If you need a closed 8-week, pick the slot that already wants it",
      body: `${slotTitle(bestProgramme)} has ${bestProgramme.programmeHeads} programme-ready students. Don’t force the East morning crowd into that model.`,
      tone: "note",
    });
  }

  const east = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "east").length;
  const ne = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "northeast").length;
  const central = responses.filter((s) => AREA_BY_ID[s.liveArea]?.cluster === "central").length;
  insights.push({
    title: "Don’t rent one studio for everyone",
    body: `${east} live in the East, ${ne} in the North-East, ${central} in Central. These are separate small groups — Tampines Friday, AMK weekday evening, Central specialist — not one large class.`,
    tone: "note",
  });

  const statedAvg =
    responses.reduce((a, s) => a + s.statedPrice, 0) / Math.max(responses.length, 1);
  const commitAvg =
    responses.reduce((a, s) => a + s.commitPrice, 0) / Math.max(responses.length, 1);
  insights.push({
    title: "They name a higher price than they will pay",
    body: `Average “feels fair” is S$${statedAvg.toFixed(0)}; average they will actually commit is S$${commitAvg.toFixed(0)}. Price the launch on the commit number, not the wish number.`,
    tone: "warn",
  });

  return insights.slice(0, 6);
}

export function currentPlanScore(responses: Student[], settings: StudioSettings): SlotScore {
  return scoreSlot(
    responses,
    { area: "tampines", day: "fri", window: "0900", classType: "hatha" },
    { ...DEFAULT_SETTINGS, ...settings, price: settings.price, sessions: settings.sessions },
  );
}
