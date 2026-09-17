import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import type { Student, SurveyInput } from "./types";

const surveySchema = z.object({
  name: z.string().trim().min(1).max(60),
  contactNumber: z.string().trim().min(1).max(20),
  locationPreference: z.string().min(1),
  travelWillingness: z.string().min(1),
  availability: z.record(z.string(), z.array(z.string())),
  classTypes: z.array(z.string()).min(1),
});

type RawRow = {
  id: number;
  name: string;
  contact_number: string;
  location_preference: string;
  travel_willingness: string;
  availability: string;
  class_types: string;
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
    name: row.name,
    contactNumber: row.contact_number,
    locationPreference: row.location_preference as any,
    travelWillingness: row.travel_willingness as any,
    availability: parseJson(row.availability, {}),
    classTypes: parseJson(row.class_types, []),
    createdAt: String(row.created_at),
  };
}

async function insertStudent(
  sql: Awaited<ReturnType<typeof getSql>>,
  data: SurveyInput,
): Promise<number> {
  const rows = await sql<{ id: number }>`
    insert into responses (
      name, contact_number, location_preference, travel_willingness, availability, class_types
    ) values (
      ${data.name},
      ${data.contactNumber},
      ${data.locationPreference},
      ${data.travelWillingness},
      ${JSON.stringify(data.availability)},
      ${JSON.stringify(data.classTypes)}
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
