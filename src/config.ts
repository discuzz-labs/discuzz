import { SiteConfig } from "@/types/types";
import site from "../site.config.json";

const config : SiteConfig = {
    name: site.name,
    logo: site.logo,
    url: site.url,
    title: site.title,
    metadata: {
        keywords: site.metadata.keywords,
        description: site.metadata.description,
        category: site.metadata.category
    },
    og: {
        url: site.og.url,
        title: site.og.title,
        locale: site.og.locale,
        description: site.og.description,
        images: site.og.images,
        siteName: site.og.siteName
    },
    twitter: {
        card: "summary_large_image",
        title: site.twitter.title,
        description: site.twitter.description,
        images: site.twitter.images
    },
    theme: {
        lightLogo: site.theme.lightLogo,
        darkLogo: site.theme.darkLogo,
        defaultTheme: site.theme.defaultTheme
    },
    contact: {
        address: site.contact.address,
        supportEmail: site.contact.supportEmail
    },
    resources: site.resources,
    email: {
        provider: site.email.provider,
        sender: site.email.sender,
    },
    icons: {
        icon: site.icons.icon,
        apple: site.icons.apple
    },
    OAuthProviders : site.OAuthProviders
};

export default config;
