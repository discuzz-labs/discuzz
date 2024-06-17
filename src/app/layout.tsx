import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar/Navbar";
import config from "@/lib/config";
import "./globals.css";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});

export const metadata: Metadata = {
  title: config.metadata.name,
  description: config.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href={config.metadata.logo} sizes="any" />
          <link
            rel="apple-touch-icon"
            href={config.metadata.logo}
            sizes="any"
          />
        </head>
        <body
          className={`${inter.className}
            bg-white
           dark:bg-black`}
        >
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
