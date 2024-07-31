import { z } from "zod";
import { Post } from '@prisma/client';

export const TABS = {
  EMPTY: "",
  POSTS: "posts",
  BOOKMARKED: "bookmarked",
  FOLLOWING: "following",
}

// Define the FILTER object with validation
export const FILTER: { [key: string]: keyof Post } = {
  CREATEDAT: "createdAt",
  VIEWS: "viewsNumber",
  LIKES: "likes",
  DISLIKES: "disLikes",
  UPDATEDAT: "updatedAt",
  ISRESTRICTED: "isRestricted"
}


export const ORDER = {
  ASC: "asc",
  DESC: "desc",
}

export const Route = {
  routeParams: z.object({
    userId: z.string(),
  }),
  searchParams: z.object({
    tab: z.enum(["", "posts", "bookmarked", "following"]).optional(),
    filter: z.enum(["createdAt", "viewsNumber", "likes","isRestricted", "disLikes", "updatedAt"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
  })
};

export type RouteType = typeof Route;
