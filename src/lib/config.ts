type ThemeType = "dark" | "light" | "system" | undefined;
type SocialButtonsVariant = "auto" | "blockButton" | "iconButton" | undefined;
type SocialButtonsPlacement = "top" | "bottom" | undefined;

interface Config {
  site: {
    url: string;
  };
  metadata: {
    keywords: string[] | undefined;
    name: string | undefined;
    description: string | undefined;
    logo: string | undefined;
    title: string | undefined;
    category: string | undefined;
    og: {
      url: string | undefined;
      title: string | undefined;
      locale: string | undefined;
      description: string | undefined;
      images: string | undefined;
      siteName: string | undefined;
    };
  };
  theme: {
    lightLogo: string | undefined;
    darkLogo: string | undefined;
    defaultTheme: ThemeType;
  };
  email: {
    sender: string | undefined;
    password: string | undefined;
    provider: string | undefined;
  };
}

const config: Config = {
  site: {
    url: (process.env.NEXT_URL as string) || "http://localhost:3000",
  },
  metadata: {
    keywords: (process.env.NEXT_PUBLIC_METADATA_KEYWORDS?.split(
      ","
    ) as string[]) || [
      "blendify",
      "blog",
      "forrum",
      process.env.NEXT_PUBLIC_METADATA_NAME,
    ],
    name: process.env.NEXT_PUBLIC_METADATA_NAME || "Blendify",
    description:
      process.env.NEXT_PUBLIC_METADATA_DESCRIPTION ||
      "Blendify - The fully opensource blog project.",
    logo: process.env.NEXT_PUBLIC_METADATA_LOGO || "/logos/logo.svg",
    title: process.env.NEXT_PUBLIC_METADATA_TITLE || "Blendify",
    category: process.env.NEXT_PUBLIC_METADATA_CATEGORY || "Blog, Forum",
    og: {
      url: process.env.NEXT_PUBLIC_METADATA_SITEURL || "http://localhost:3000",
      images: process.env.NEXT_PUBLIC_METADATA_OG_IMAGE || "logos/logo.svg",
      title: process.env.NEXT_PUBLIC_METADATA_OG_TITLE || "Blendify",
      description:
        process.env.NEXT_PUBLIC_METADATA_OG_DESCRIPTION ||
        "Blendify - The fully opensource blog project.",
      siteName: process.env.NEXT_PUBLIC_METADATA_OG_SITENAME || "Blendify",
      locale: process.env.NEXT_PUBLIC_METADATA_OG_LOCALE || "en_US",
    },
  },
  theme: {
    lightLogo: process.env.NEXT_PUBLIC_SITE_LIGHT_LOGO || "/logos/logo.svg",
    darkLogo: process.env.NEXT_PUBLIC_SITE_DARK_LOGO || "/logos/logo-dark.svg",
    defaultTheme: (["dark", "light", "system"].includes(
      process.env.NEXT_PUBLIC_SITE_DEFAULT_THEME as string
    )
      ? process.env.NEXT_PUBLIC_SITE_DEFAULT_THEME
      : "light") as ThemeType,
  },
  email: {
    sender: process.env.NEXT_PUBLIC_SENDEER_EMAIL,
    password: process.env.NEXT_PUBLIC_SENDER_EMAIL_PASSWORD,
    provider: process.env.NEXT_PUBLIC_SENDER_EMAIL_PROVIDER,
  },
};

export default config;
