import { DatabaseResponse } from "@/types/types";
import prisma from "@/lib/prisma";

export default class Bookmark {
  public async bookmarkPost({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }): Promise<DatabaseResponse> {
    await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });

    return {
      data: null,
      success: true,
      error: null,
    };
  }

  public async isBookmarkedPost({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }): Promise<DatabaseResponse<boolean>> {
    const post = await prisma.bookmark.findMany({
      where: {
        userId,
        postId,
      },
    });
    return {
      data: post.length > 0,
      success: true,
      error: null,
    };
  }

  public async unBookmarkPost({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }): Promise<DatabaseResponse> {
    await prisma.bookmark.deleteMany({
      where: {
        userId,
        postId,
      },
    });

    return {
      data: null,
      success: true,
      error: null,
    };
  }
}
