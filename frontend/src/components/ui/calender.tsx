// src/components/ui/calendar.tsx
"use client";
import { useState } from "react";
import { DateValue } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { Calendar as AriaCalendar } from "@react-aria/calendar";
import { useCalendarState } from "@react-stately/calendar";
import { CalendarProps } from "react-day-picker";

export function Calendar(props: CalendarProps) {
  const { locale } = useLocale();
  const [date, setDate] = useState<DateValue>();

  const state = useCalendarState({
    ...props,
    locale,
    value: date,
    onChange: setDate,
  });

  return (
    <AriaCalendar
      {...props}
      aria-label="Event date"
      value={date}
      onChange={setDate}
      className="rounded-md border p-3"
    />
  );
}
