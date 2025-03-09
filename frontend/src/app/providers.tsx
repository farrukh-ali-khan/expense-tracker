// src/app/providers.tsx
"use client";

import { AuthProvider } from "@/context/AuthContext";
// import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
