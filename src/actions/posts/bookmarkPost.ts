"use server";

import AppError from "@/services/error";
import log from "@/lib/log";
import Bookmark from "@/database/Bookmark";

export interface bookmarkPostArgs {
  userId: string;
  postId: string;
}

async function bookmarkPost({
  userId,
  postId,
}: bookmarkPostArgs): Promise<null> {
  try {
    const postBookmark = await new Bookmark().bookmarkPost({ postId, userId });

    if (postBookmark.success === false)
      throw new AppError("POST_BOOKMARK_FAILED");

    return null
  } catch (err: any) {
    if(err instanceof AppError) throw err
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default bookmarkPost;
