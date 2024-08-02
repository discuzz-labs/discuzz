"use server";

import AppError from "@/services/error";
import log from "@/lib/log";
import Posts from "@/database/Posts";

export interface unBookmarkUserPostArgs {
  userId: string;
  postId: string;
}

async function unBookmarkUserPost({
  userId,
  postId,
}: unBookmarkUserPostArgs): Promise<null> {
  try {
    const postUnBookmark = await new Posts({ postId, userId }).unBookmarkPost();

    if (postUnBookmark.success === false) {
    throw new AppError("POST_UNBOOKMARK_FAILED")
    }

    return null
  } catch (err : any) {
    if(err instanceof AppError) throw err
    log("actions", err, `ACTIONS ${__filename}`);
   throw new AppError("SERVER_ERROR")
  }
}

export default unBookmarkUserPost;
