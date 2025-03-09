// src/providers/date-picker-context.tsx
"use client";
import { createContext } from "react";
import { DatePickerState } from "@react-stately/datepicker";

export const DatePickerContext = createContext<DatePickerState | null>(null);
