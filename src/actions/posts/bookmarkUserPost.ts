"use server";

import error from "@/services/error";
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
      throw new Error(error("POST_BOOKMARK_FAILED"));

    return null
  } catch (err) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new Error(error("SERVER_ERROR"));
  }
}

export default bookmarkUserPost;
