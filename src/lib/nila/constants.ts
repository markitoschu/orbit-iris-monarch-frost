export const AREAS = [
  { id: "tampines", label: "Tampines" },
  { id: "amk", label: "Ang Mo Kio" },
  { id: "orchard", label: "Orchard" },
  { id: "bugis", label: "Bugis/Chinatown" },
  { id: "other", label: "Other" },
];

export const CLASS_TYPES = [
  { id: "hatha", label: "Hatha" },
  { id: "vinyasa", label: "Vinyasa Flow" },
  { id: "core", label: "Core Yoga" },
  { id: "other", label: "Others" },
];

export const WEEKDAY_SLOTS = [
  { id: "0730", label: "7:30–8:30am", period: "morning" },
  { id: "0830", label: "8:30–9:30am", period: "morning" },
  { id: "0930", label: "9:30–10:30am", period: "morning" },
  { id: "1030", label: "10:30–11:30am", period: "morning" },
  { id: "1130", label: "11:30am–12:30pm", period: "morning" },
  { id: "1230", label: "12:30–1:30pm", period: "morning" },
  { id: "1730", label: "5:30–6:30pm", period: "evening" },
  { id: "1830", label: "6:30–7:30pm", period: "evening" },
  { id: "1930", label: "7:30–8:30pm", period: "evening" },
  { id: "2030", label: "8:30–9:30pm", period: "evening" },
];

export const WEEKEND_SLOTS = [
  { id: "early", label: "Early morning", period: "morning" },
  { id: "late-morning", label: "Late morning", period: "morning" },
  { id: "afternoon", label: "Early afternoon", period: "afternoon" },
  { id: "evening", label: "Evening", period: "evening" },
];

export const DAYS = [
  { id: "mon", label: "Monday" },
  { id: "tue", label: "Tuesday" },
  { id: "wed", label: "Wednesday" },
  { id: "thu", label: "Thursday" },
  { id: "fri", label: "Friday" },
  { id: "sat", label: "Saturday" },
  { id: "sun", label: "Sunday" },
];

export const AREA_BY_ID = Object.fromEntries(AREAS.map((a) => [a.id, a]));
export const CLASS_BY_ID = Object.fromEntries(CLASS_TYPES.map((c) => [c.id, c]));

export const DEFAULT_SETTINGS = {
  price: 20,
  sessions: 8,
  minStudents: 10,
  smallRental: 100,
};

export type AreaId = typeof AREAS[number]["id"];
export type ClassType = typeof CLASS_TYPES[number]["id"];

export interface StudioSettings {
  price: number;
  sessions: number;
  minStudents: number;
  smallRental: number;
}

export const HUBS = [
  { id: "tampines", label: "Tampines" },
  { id: "amk", label: "Ang Mo Kio" },
  { id: "orchard", label: "Orchard" },
  { id: "bugis", label: "Bugis" },
];
