"use server";

import error from "@/services/error";
import type { PostsWithCounts } from "@/types/types";
import log from "@/lib/log";
import Posts from "@/database/Posts";
import { Post } from "@prisma/client";

interface getUserPostsArgs {
  userId: string;
  cursor?: string;
  onlyBookMarked: boolean;
  orderBy: { [K in keyof Post]?: "asc" | "desc" };
  onlyFollowingPosts: boolean;
}

async function getUserPosts({ userId, cursor, onlyBookMarked, orderBy, onlyFollowingPosts }: getUserPostsArgs): Promise<
  {
    posts: PostsWithCounts[];
    metaData: {
      lastCursor: undefined | string;
      hasNextPage: boolean;
    };
  }
> {
  try {
    const postsFetch = await new Posts({
      currentCursor: cursor ? cursor : undefined,
      postsPerPage: 10,
      orderBy,
      userId: userId,
      onlyBookMarked,
      onlyFollowingPosts
    }).fetchPosts();

    if (postsFetch.success === false) {
      throw new Error(error("POST_FETCH_FAILED"))
    }

    return postsFetch.data

  } catch (err) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new Error(error("SERVER_ERROR"))
  }
}

export default getUserPosts;
