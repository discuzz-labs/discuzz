import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_METADATA_NAME,
  description: process.env.NEXT_PUBLIC_METADATA_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_METADATA_LOGO}
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href={process.env.NEXT_PUBLIC_METADATA_APPLE_TOUCH_ICON}
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
  );
}
