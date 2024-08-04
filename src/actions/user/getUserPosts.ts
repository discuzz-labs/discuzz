"use server";

import AppError from "@/services/error";
import log from "@/lib/log";
import Posts from "@/database/Posts";
import { Prisma } from "@prisma/client";
import { PostWithAuthor } from "@/types/types";
import { CurrentFilters } from "@/hooks/useFilter";

export interface getUserPostsArgs {
  userId: string;
  cursor?: string;
  isOwner: boolean;
  filter: CurrentFilters;
}

async function getUserPosts({
  userId,
  cursor,
  isOwner,
  filter
}: getUserPostsArgs): Promise<{
  posts: PostWithAuthor[];
  metaData: {
    lastCursor: string | undefined;
    hasNextPage: boolean;
  };
} | null> {
  try {
    const posts = await new Posts().getUserPosts({
      userId,
      cursor,
      isOwner,
      filter,
    });

    if (!posts.success) {
      throw new AppError("POST_FETCH_FAILED");
    }

    return posts.data;
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default getUserPosts;
