import { Montserrat } from "next/font/google";
import type { Metadata } from "next";

export const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400","500", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.og.url),
  title: {
    template: `%s | ${config.title}`,
    default: config.name,
  },
  description: config.metadata.description,
  keywords: config.metadata.keywords,
  openGraph: {
    images: config.og.images,
    title: config.og.title,
    description: config.og.description,
    siteName: config.og.siteName,
    locale: config.og.locale,
    type: "website",
  },
  icons: {
    icon: config.icons.icon,
    apple: config.icons.apple,
  },
  twitter: {
    card: "summary_large_image",
    title: config.twitter.title,
    description: config.twitter.description,
    images: config.twitter.images,
  },
  category: config.metadata.category,
};