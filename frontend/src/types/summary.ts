// src/types/index.ts
export interface SummaryCardData {
  title: string;
  value: number;
  currency?: string;
  trend: "up" | "down" | "neutral" | "none";
}
