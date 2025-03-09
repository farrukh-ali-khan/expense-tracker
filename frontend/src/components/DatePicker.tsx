// Example: src/components/DatePicker.tsx
"use client";

import { DayPicker } from "react-day-picker";

export function DatePicker() {
  return (
    <DayPicker
      mode="single"
      fromDate={new Date(new Date().getFullYear() - 1, 0, 1)}
      toDate={new Date(new Date().getFullYear() + 1, 11, 31)}
    />
  );
}
