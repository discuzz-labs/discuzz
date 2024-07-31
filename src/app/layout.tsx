import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import config from "@/lib/config";
import AuthProvider from "@/providers/AuthProvider";
import "../styles/globals.css";
import "../styles/theme.css";
import build from "@/build";
import QueryProvider from "@/providers/QueryProvider";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "800"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * Checks for ENV variabels
   * Only runs in dev mode.
   */
  build();
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}bg-background`}>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <NextIntlClientProvider messages={messages}>
                <NavBar />
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
