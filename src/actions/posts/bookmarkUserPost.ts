"use server";

import AppError from "@/services/error";
import log from "@/lib/log";
import Posts from "@/database/Posts";

export interface bookmarkUserPostArgs {
  userId: string;
  postId: string;
}

async function bookmarkUserPost({
  userId,
  postId,
}: bookmarkUserPostArgs): Promise<null> {
  try {
    const postBookmark = await new Posts({ postId, userId }).bookmarkPost();

    if (postBookmark.success === false)
      throw new AppError("POST_BOOKMARK_FAILED");

    return null
  } catch (err: any) {
    if(err instanceof AppError) throw err
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default bookmarkUserPost;
