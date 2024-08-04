"use server";

import log from "@/lib/log";
import Posts from "@/database/Posts";
import AppError from "@/services/error";

export interface deletePostArgs {
  postId: string;
  userId: string;
}

async function deletePost({ postId, userId }: deletePostArgs): Promise<null> {
  try {
    const postDeletion = await new Posts().deletePost({
      postId,
      userId
    });

    if (postDeletion.success === false)
      throw new AppError("POST_DELETE_FAILED");

    return null;
  } catch (err: any) {
    console.log(
      err
    )
    if(err instanceof AppError) throw err
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default deletePost;
