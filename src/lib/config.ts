interface Config {
  metadata: {
    name: string | undefined;
    description: string | undefined;
    logo: string | undefined;
  };
  theme: {
    lightLogo: string | undefined;
    darkLogo: string | undefined;
    defaultTheme: string | undefined;
  };
}

const config: Config = {
  metadata: {
    name: process.env.NEXT_PUBLIC_METADATA_NAME,
    description: process.env.NEXT_PUBLIC_METADATA_DESCRIPTION,
    logo: process.env.NEXT_PUBLIC_METADATA_LOGO,
  },
  theme: {
    lightLogo: process.env.NEXT_PUBLIC_SITE_LIGHT_LOGO,
    darkLogo: process.env.NEXT_PUBLIC_SITE_DARK_LOGO,
    defaultTheme: process.env.NEXT_PUBLIC_SITE_DEFAULT_THEME,
  },
};

export default config;
