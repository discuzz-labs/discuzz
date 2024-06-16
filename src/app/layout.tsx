import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="en">
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
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
