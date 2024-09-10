"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import config from "@/config";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      enableColorScheme={false}
      defaultTheme={config.theme.defaultTheme}
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
