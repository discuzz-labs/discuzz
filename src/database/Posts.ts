import { Post, PostStatus, Prisma } from "@prisma/client";
import { DatabaseResponse, PostWithAuthor } from "@/types/types";
import prisma from "@/lib/prisma";
import { CurrentFilters } from "@/hooks/useFilter";

export default class Posts {
  public async getUserPosts({
    userId,
    cursor,
    isOwner,
    filter,
  }: {
    userId: string;
    cursor: string | undefined;
    isOwner: boolean;
    filter: CurrentFilters;
  }): Promise<
    DatabaseResponse<{
      posts: PostWithAuthor[];
      metaData: { lastCursor: string | undefined; hasNextPage: boolean };
    }>
  > {
    const pageSize = 10; // Define the number of posts to retrieve per page

    // Base query conditions
    const where = {
      authorId: userId,
      ...(isOwner ? {} : { status: { not: PostStatus.RESTRICTED } }),
      ...(filter.status && { status: filter.status }),
      ...(filter.tags && { tags: { has: filter.tags } }),
      ...(filter.category && { category: filter.category }),
    };

    // Include bookmarks in the query if filtering by bookmarked status
    const includeBookmarks = filter.bookmarked !== undefined;

    const postsQuery = prisma.post.findMany({
      where: {
        ...where,
        ...(includeBookmarks && {
          bookmarks: {
            some: {
              userId: userId,
            },
          },
        }),
      },
      cursor: cursor ? { id: cursor } : undefined,
      take: pageSize + 1, // Fetch one extra post to check if there is a next page
      orderBy: filter.filter && filter.order ? [{ [filter.filter]: filter.order }, { id: "asc" }] : [{ id: "asc" }],
      include: {
        author: {
          select: {
            id: true,
            email: true,
            image: true,
            name: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
        bookmarks: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    const posts = await postsQuery;

    if (posts.length === 0) {
      return {
        data: {
          posts: [],
          metaData: {
            lastCursor: undefined,
            hasNextPage: false,
          },
        },
        success: true,
        error: null,
      };
    }

    const hasNextPage = posts.length > pageSize;
    const fetchedPosts = hasNextPage ? posts.slice(0, pageSize) : posts;
    const lastCursor = fetchedPosts[fetchedPosts.length - 1].id;

    return {
      data: {
        posts: fetchedPosts,
        metaData: {
          lastCursor: hasNextPage ? lastCursor : undefined,
          hasNextPage,
        },
      },
      success: true,
      error: null,
    };
  }

  public async deletePost({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }): Promise<DatabaseResponse> {
    await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    return {
      data: null,
      success: true,
      error: null,
    };
  }
}
