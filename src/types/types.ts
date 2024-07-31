import errorMessages from "../../lang/english/error.json";
import { ProviderName } from "@/OAuthProviders/OAuthProviders";
import { Bookmark, Post, User } from "@prisma/client";

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
};

export type UserWithCounts = User & {
  _count: {
    followers: number;
    following: number;
  }
};

export type PostsWithCounts = Post & {
  author: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
  _count: {
    comments: number;
  };
  bookmarks: Bookmark[];
  isBookmarked: boolean; 
};

export type ErrorCodes = keyof typeof errorMessages.error;
