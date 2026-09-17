import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { SEED_STUDENTS } from "./seed";
import type { Student, SurveyInput } from "./types";

const surveySchema = z.object({
  firstName: z.string().trim().min(1).max(40),
  liveArea: z.string().min(1),
  workArea: z.string(),
  convenientAreas: z.array(z.string()).min(1),
  travel: z.string().min(1),
  preferredDays: z.array(z.string()).min(1),
  preferredTimes: z.array(z.string()).min(1),
  timeWindows: z.array(z.string()).min(1),
  classTypes: z.array(z.string()).min(1),
  frequency: z.string().min(1),
  statedPrice: z.number().int().min(10).max(80),
  commitPrice: z.number().int().min(10).max(80),
  packages: z.array(z.string()).min(1),
  commitmentStyle: z.string().min(1),
  makeup: z.string().min(1),
  studioPriorities: z.array(z.string()).min(1).max(3),
  trueYogaStudent: z.boolean(),
});

type RawRow = {
  id: number;
  first_name: string;
  live_area: string;
  work_area: string;
  convenient_areas: string;
  travel_willingness: string;
  preferred_days: string;
  preferred_times: string;
  time_windows: string;
  class_types: string;
  frequency: string;
  stated_price: number;
  commit_price: number;
  packages: string;
  commitment_style: string;
  makeup_valued: string;
  studio_priorities: string;
  true_yoga_student: boolean;
  created_at: string;
};

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function parseRow(row: RawRow): Student {
  return {
    id: Number(row.id),
    firstName: row.first_name,
    liveArea: row.live_area as Student["liveArea"],
    workArea: (row.work_area || "") as Student["workArea"],
    convenientAreas: parseJson(row.convenient_areas, []),
    travel: row.travel_willingness as Student["travel"],
    preferredDays: parseJson(row.preferred_days, []),
    preferredTimes: parseJson(row.preferred_times, []),
    timeWindows: parseJson(row.time_windows, []),
    classTypes: parseJson(row.class_types, []),
    frequency: row.frequency as Student["frequency"],
    statedPrice: Number(row.stated_price),
    commitPrice: Number(row.commit_price),
    packages: parseJson(row.packages, []),
    commitmentStyle: row.commitment_style as Student["commitmentStyle"],
    makeup: row.makeup_valued as Student["makeup"],
    studioPriorities: parseJson(row.studio_priorities, []),
    trueYogaStudent: Boolean(row.true_yoga_student),
    createdAt: String(row.created_at),
  };
}

async function insertStudent(
  sql: Awaited<ReturnType<typeof getSql>>,
  data: SurveyInput,
): Promise<number> {
  const rows = await sql<{ id: number }>`
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

export const listResponses = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<RawRow>`select * from responses order by id asc`;
  return rows.map(parseRow);
});

export const submitResponse = createServerFn({ method: "POST" })
  .validator((data: unknown) => surveySchema.parse(data))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const id = await insertStudent(sql, data as SurveyInput);
    const counted = await sql<{ n: number }>`select count(*)::int as n from responses`;
    return { id, total: Number(counted[0]?.n ?? 0) };
  });

