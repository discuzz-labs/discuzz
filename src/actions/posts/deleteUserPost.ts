"use server";

import error from "@/services/error";
import log from "@/lib/log";
import Posts from "@/database/Posts";

export interface deleteUserPostArgs {
  postId: string;
  userId: string;
}

async function deleteUserPost({ postId, userId }: deleteUserPostArgs): Promise<null> {
  try {
    const postDeletion = await new Posts({
      postId,
      userId
    }).deletePost();

    if (postDeletion.success === false)
      throw new Error(error("POST_DELETE_FAILED"));

    return null;
  } catch (err) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new Error(error("SERVER_ERROR"));
  }
}

export default deleteUserPost;
