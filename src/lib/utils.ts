import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSgd(n: number): string {
  return `S$${Math.round(n).toLocaleString("en-SG")}`;
}
