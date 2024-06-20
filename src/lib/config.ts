type ThemeType = "dark" | "light" | "system" | undefined;
type SocialButtonsVariant = "auto" | "blockButton" | "iconButton" | undefined;
type SocialButtonsPlacement = "top" | "bottom" | undefined;

interface Config {
  metadata: {
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
  clerk: {
    socialButtonsVariant: SocialButtonsVariant;
    socialButtonsPlacement: SocialButtonsPlacement;
  };
}

const config: Config = {
  metadata: {
    name: process.env.NEXT_PUBLIC_METADATA_NAME || "Blendify",
    description:
      process.env.NEXT_PUBLIC_METADATA_DESCRIPTION ||
      "Blendify - The fully opensource blog project.",
    logo: process.env.NEXT_PUBLIC_METADATA_LOGO || "/logos/logo.svg",
    title: process.env.NEXT_PUBLIC_METADATA_TITLE || "Blendify",
    category: process.env.NEXT_PUBLIC_METADATA_CATEGORY || "Blog, Forum",
    og: {
      url: process.env.EXT_PUBLIC_METADATA_SITEURL || "",
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
  clerk: {
    socialButtonsVariant: (["auto", "blockButton", "iconButton"].includes(
      process.env.NEXT_PUBLIC_CLERK_SOCIAL_BUTTONS_VARIANT as string
    )
      ? process.env.NEXT_PUBLIC_CLERK_SOCIAL_BUTTONS_VARIANT
      : "auto") as SocialButtonsVariant,
    socialButtonsPlacement: (["top", "bottom"].includes(
      process.env.NEXT_PUBLIC_CLERK_SOCIAL_BUTTONS_PLACEMENT as string
    )
      ? process.env.NEXT_PUBLIC_CLERK_SOCIAL_BUTTONS_PLACEMENT
      : "bottom") as SocialButtonsPlacement,
  },
};

export default config;
