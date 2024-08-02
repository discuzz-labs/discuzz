"use server";

import log from "@/lib/log";
import Posts from "@/database/Posts";
import AppError from "@/services/error";

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
      throw new AppError("POST_DELETE_FAILED");

    return null;
  } catch (err: any) {
    if(err instanceof AppError) throw err
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default deleteUserPost;
