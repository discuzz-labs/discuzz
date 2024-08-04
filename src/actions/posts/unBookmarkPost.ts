"use server";

import AppError from "@/services/error";
import log from "@/lib/log";
import Bookmark from "@/database/Bookmark";

export interface unBookmarkPostArgs {
  userId: string;
  postId: string;
}

async function unBookmarkPost({
  userId,
  postId,
}: unBookmarkPostArgs): Promise<null> {
  try {
    const postUnBookmark = await new Bookmark().unBookmarkPost({ postId, userId });

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

export default unBookmarkPost;
