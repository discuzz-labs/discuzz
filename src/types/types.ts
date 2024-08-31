import messages from "../lang/en-GB/messages.json";
import { Prisma } from "@prisma/client";

export type DatabaseResponse<T = null> = {
    error: any;
    success: boolean;
    data: T | null;
};

export type OAuthUserProfile = {
    id: string;
    email: string;
    name: string;
    image: string;
    verified: boolean;
    success: boolean;
    error: string | null;
};

export type OAuthProviderConfig = {
    provider: any;
};

export type UserWithCounts = Prisma.UserGetPayload<{
    include: {
        _count: {
            select: {
                posts: true;
            };
        };
    };
}>;

export type PostWithAuthor = Prisma.PostGetPayload<{
    include: {
        author: {
            select: {
                id: true;
                email: true;
                image: true;
                name: true;
            };
        };
        _count: {
            select: {
                comments: true;
            };
        };
    };
}>;

export type ErrorCodes = keyof typeof messages.error;

export type SiteConfig = {
    name: string;
    logo: string;
    url: string;
    title: string;
    metadata: {
        keywords: string[];
        description: string;
        category: string;
    };
    og: {
        url: string;
        title: string;
        locale: string;
        description: string;
        images: string | string[];
        siteName: string;
    };
    twitter: {
        card: "summary_large_image";
        title: string;
        description: string;
        images: string | string[];
    };
    theme: {
        lightLogo: string | undefined;
        darkLogo: string | undefined;
        defaultTheme: string;
    };
    contact: {
        address: string;
        supportEmail: string;
    };
    resources: {
        [key: string] : string;
    };
    email: {
        provider: string;
        sender: string;
    };
    icons: {
        icon: string;
        apple: string;
    };
    OAuthProviders : 
        {
            name: string;
            displayName: string;
            logo: string;
        }[]
};
