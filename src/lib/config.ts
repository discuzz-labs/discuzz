type ThemeType = "dark" | "light" | "system" | undefined;
type SocialButtonsVariant = "auto" | "blockButton" | "iconButton" | undefined;
type SocialButtonsPlacement = "top" | "bottom" | undefined;

interface Config {
  metadata: {
    name: string | undefined;
    description: string | undefined;
    logo: string | undefined;
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
    name: process.env.NEXT_PUBLIC_METADATA_NAME || "Logo",
    description:
      process.env.NEXT_PUBLIC_METADATA_DESCRIPTION ||
      "My own forum build on Blendify Inc.",
    logo: process.env.NEXT_PUBLIC_METADATA_LOGO || "/logo.svg",
  },
  theme: {
    lightLogo: process.env.NEXT_PUBLIC_SITE_LIGHT_LOGO || "/logo.svg",
    darkLogo: process.env.NEXT_PUBLIC_SITE_DARK_LOGO || "/logo-dark.svg",
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
