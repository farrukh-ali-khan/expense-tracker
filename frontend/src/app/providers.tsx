// src/app/providers.tsx
"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { DayPickerProvider } from "react-day-picker";
import { Toaster } from "sonner";

// Required configuration for DayPicker
const dayPickerConfig = {
  fromDate: new Date(new Date().getFullYear() - 1, 0, 1), // Last year January 1st
  toDate: new Date(new Date().getFullYear() + 1, 11, 31), // Next year December 31st
  modifiers: {},
  modifiersClassNames: {},
  locale: "en-US",
  mode: "default",
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DayPickerProvider
        fromDate={dayPickerConfig.fromDate}
        toDate={dayPickerConfig.toDate}
        modifiers={dayPickerConfig.modifiers}
        modifiersClassNames={dayPickerConfig.modifiersClassNames}
        locale={dayPickerConfig.locale}
        mode={dayPickerConfig.mode}
      >
        {children}
        <Toaster position="top-center" richColors />
      </DayPickerProvider>
    </AuthProvider>
  );
}
