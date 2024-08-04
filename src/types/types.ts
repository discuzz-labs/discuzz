import messages from "../lang/en-GB/messages.json";
import { ProviderName } from "@/OAuthProviders/OAuthProviders";
import { Bookmark, Post, Prisma, User } from "@prisma/client";

export type DatabaseResponse<T = null> = {
  error: any;
  success: boolean;
  data: T | null;
}

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
  name: ProviderName;
  logo: string;
  providerDisplayName: string;
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
    },
    _count: {
      select: {
        comments: true,
      }
    }
  };
}>;

export type ErrorCodes = keyof typeof messages.error;
