import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import config from "@/lib/config";
import "../styles/globals.css";
import "../styles/theme.css";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.metadata.og.url as string),
  title: {
    template: `%s | ${config.metadata.title as string}`,
    default: config.metadata.name as string,
  },
  description: config.metadata.description,
  generator: "Blendify",
  applicationName: config.metadata.name,
  referrer: "origin-when-cross-origin",
  keywords: config.metadata.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: config.metadata.og.images,
    title: config.metadata.og.title,
    description: config.metadata.og.description,
    siteName: config.metadata.og.siteName,
    locale: config.metadata.og.locale,
    type: "website",
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: config.metadata.logo,
    apple: config.metadata.logo,
  },
  twitter: {
    card: "summary_large_image",
    title: config.metadata.title,
    description: config.metadata.description,
    images: config.metadata.og.images,
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  category: config.metadata.category,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className}
            bg-white
           dark:bg-black`}
        >
          <ThemeProvider>
            <NavBar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
