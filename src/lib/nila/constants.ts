export const AREAS = [
  { id: "tampines", label: "Tampines", cluster: "east", hub: true },
  { id: "bedok", label: "Bedok", cluster: "east", hub: true },
  { id: "pasir_ris", label: "Pasir Ris", cluster: "east", hub: false },
  { id: "simei", label: "Simei", cluster: "east", hub: false },
  { id: "marine_parade", label: "Marine Parade", cluster: "east", hub: false },
  { id: "amk", label: "Ang Mo Kio", cluster: "northeast", hub: true },
  { id: "serangoon", label: "Serangoon", cluster: "northeast", hub: true },
  { id: "hougang", label: "Hougang", cluster: "northeast", hub: false },
  { id: "bishan", label: "Bishan", cluster: "northeast", hub: false },
  { id: "punggol", label: "Punggol / Sengkang", cluster: "northeast", hub: false },
  { id: "bugis", label: "Bugis / City Hall", cluster: "central", hub: true },
  { id: "tanjong_pagar", label: "Tanjong Pagar / Raffles Place", cluster: "central", hub: true },
  { id: "chinatown", label: "Chinatown", cluster: "central", hub: false },
  { id: "novena", label: "Novena", cluster: "central", hub: false },
  { id: "orchard", label: "Orchard", cluster: "central", hub: false },
] as const;

export type AreaId = (typeof AREAS)[number]["id"];
export type ClusterId = (typeof AREAS)[number]["cluster"];

export const CLUSTERS: { id: ClusterId; label: string }[] = [
  { id: "east", label: "East" },
  { id: "northeast", label: "North-East" },
  { id: "central", label: "Central" },
];

export const HUBS = AREAS.filter((a) => a.hub);

export const AREA_BY_ID = Object.fromEntries(AREAS.map((a) => [a.id, a])) as Record<
  AreaId,
  (typeof AREAS)[number]
>;

export const ADJACENT: Record<AreaId, AreaId[]> = {
  tampines: ["bedok", "pasir_ris", "simei"],
  bedok: ["tampines", "simei", "marine_parade"],
  pasir_ris: ["tampines", "simei"],
  simei: ["tampines", "bedok", "pasir_ris"],
  marine_parade: ["bedok", "bugis"],
  amk: ["bishan", "serangoon", "hougang"],
  serangoon: ["amk", "hougang", "bishan", "novena"],
  hougang: ["serangoon", "amk", "punggol"],
  bishan: ["amk", "serangoon", "novena"],
  punggol: ["hougang", "serangoon"],
  bugis: ["chinatown", "tanjong_pagar", "novena", "orchard", "marine_parade"],
  tanjong_pagar: ["chinatown", "bugis", "orchard"],
  chinatown: ["tanjong_pagar", "bugis"],
  novena: ["orchard", "bugis", "bishan", "serangoon"],
  orchard: ["novena", "bugis", "tanjong_pagar"],
};

export const DAYS = [
  { id: "mon", label: "Monday", short: "Mon" },
  { id: "tue", label: "Tuesday", short: "Tue" },
  { id: "wed", label: "Wednesday", short: "Wed" },
  { id: "thu", label: "Thursday", short: "Thu" },
  { id: "fri", label: "Friday", short: "Fri" },
  { id: "sat", label: "Saturday", short: "Sat" },
  { id: "sun", label: "Sunday", short: "Sun" },
] as const;

export type DayId = (typeof DAYS)[number]["id"];

export const TIME_BUCKETS = [
  { id: "early", label: "Early morning", hint: "6:30–8:30" },
  { id: "morning", label: "Morning", hint: "9:00–12:00" },
  { id: "lunch", label: "Lunch", hint: "12:00–14:00" },
  { id: "afternoon", label: "Afternoon", hint: "14:00–18:00" },
  { id: "evening", label: "Evening", hint: "18:30–20:30" },
] as const;

export type TimeBucket = (typeof TIME_BUCKETS)[number]["id"];

export const TIME_WINDOWS = [
  { id: "0630", label: "6:30–7:30", bucket: "early" },
  { id: "0730", label: "7:30–8:30", bucket: "early" },
  { id: "0900", label: "9:00–10:00", bucket: "morning" },
  { id: "1000", label: "10:00–11:00", bucket: "morning" },
  { id: "1100", label: "11:00–12:00", bucket: "morning" },
  { id: "1215", label: "12:15–13:15", bucket: "lunch" },
  { id: "1830", label: "18:30–19:30", bucket: "evening" },
  { id: "1930", label: "19:30–20:30", bucket: "evening" },
] as const;

export type WindowId = (typeof TIME_WINDOWS)[number]["id"];

export const CLASS_TYPES = [
  { id: "hatha", label: "Hatha", blurb: "Steady, alignment-led" },
  { id: "vinyasa", label: "Vinyasa Flow", blurb: "Breath-linked movement" },
  { id: "ashtanga", label: "Ashtanga", blurb: "Set sequence, stronger" },
  { id: "yin", label: "Yin", blurb: "Long holds, quiet" },
  { id: "restorative", label: "Restorative", blurb: "Supported rest" },
  { id: "therapy", label: "Yoga Therapy", blurb: "Personal, therapeutic" },
  { id: "beginners", label: "Foundations", blurb: "Beginner-friendly" },
  { id: "pranayama", label: "Breath & meditation", blurb: "Pranayama, stillness" },
] as const;

export type ClassId = (typeof CLASS_TYPES)[number]["id"];

export const FREQUENCIES = [
  { id: "weekly", label: "Once a week", sessions: 1 },
  { id: "twice", label: "Twice a week", sessions: 2 },
  { id: "few", label: "2–3 times a week", sessions: 2.5 },
  { id: "occasional", label: "Occasionally", sessions: 0.4 },
] as const;

export type FreqId = (typeof FREQUENCIES)[number]["id"];

export const PACKAGES = [
  { id: "dropin", label: "Drop-in / single class" },
  { id: "4pack", label: "4-class package" },
  { id: "8pack", label: "8-class package" },
  { id: "monthly", label: "Monthly membership" },
  { id: "private", label: "Small-group private (3–5 people)" },
] as const;

export type PackId = (typeof PACKAGES)[number]["id"];

export const COMMIT_STYLES = [
  {
    id: "fixed",
    label: "Fixed 8-session programme",
    hint: "Same slot each week. Simple for Nila, less flexible for you.",
  },
  {
    id: "flexible",
    label: "Flexible class pack",
    hint: "Use classes within a window, including makeup at another Nila class.",
  },
  {
    id: "monthly",
    label: "Monthly membership",
    hint: "Come as often as you like that month.",
  },
] as const;

export type CommitStyle = (typeof COMMIT_STYLES)[number]["id"];

export const MAKEUP = [
  { id: "essential", label: "I need makeup classes — my Fridays are unpredictable" },
  { id: "valued", label: "I would value makeup, but I can usually make a fixed slot" },
  { id: "no", label: "I can commit to a fixed weekly slot" },
] as const;

export type MakeupId = (typeof MAKEUP)[number]["id"];

export const PRIORITIES = [
  { id: "location_home", label: "Near home" },
  { id: "location_work", label: "Near work" },
  { id: "mrt", label: "MRT access" },
  { id: "parking", label: "Parking" },
  { id: "bus", label: "Bus access" },
  { id: "size", label: "Studio size / not crowded" },
  { id: "mats", label: "Mats & props provided" },
  { id: "price", label: "Price" },
  { id: "small_group", label: "Small group (knowing classmates)" },
  { id: "same_slot", label: "Same classmates each week" },
] as const;

export type PriorityId = (typeof PRIORITIES)[number]["id"];

export const TRAVEL = [
  { id: "same", label: "Stay in my neighbourhood", hint: "10 minutes or less" },
  { id: "nearby", label: "Nearby MRT is fine", hint: "About 10–20 minutes" },
  { id: "island", label: "I’ll travel farther for Nila", hint: "Across town if the class is right" },
] as const;

export type TravelId = (typeof TRAVEL)[number]["id"];

export const PRICE_POINTS = [15, 18, 20, 22, 25, 28, 30] as const;

export const DEFAULT_SETTINGS = {
  smallRental: 100,
  largeRental: 120,
  largeFrom: 13,
  minStudents: 10,
  sessions: 8,
  price: 18,
  hours: 1,
};

export type StudioSettings = typeof DEFAULT_SETTINGS;

export function labelOf<T extends { id: string; label: string }>(
  list: readonly T[],
  id: string,
): string {
  return list.find((x) => x.id === id)?.label ?? id;
}
