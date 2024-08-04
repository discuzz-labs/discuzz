"use server";

import AppError from "@/services/error";
import log from "@/lib/log";
import Bookmark from "@/database/Bookmark";

export interface isBookmarkedPostArgs {
  userId: string;
  postId: string;
}

async function isBookmarkedPost({
  userId,
  postId,
}: isBookmarkedPostArgs): Promise<boolean> {
  try {
    const postIsBookmarked = await new Bookmark().isBookmarkedPost({ postId, userId });

    if (postIsBookmarked.success === false)
      throw new AppError("POST_BOOKMARK_FAILED");

    return postIsBookmarked.data as boolean
  } catch (err: any) {
    if(err instanceof AppError) throw err
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default isBookmarkedPost;
