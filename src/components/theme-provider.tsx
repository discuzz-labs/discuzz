"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      enableColorScheme={false}
      defaultTheme={process.env.NEXT_PUBLIC_SITE_DEFAULT_THEME}
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
