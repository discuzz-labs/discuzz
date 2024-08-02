import { Bookmark, Post } from "@prisma/client";
import prisma from "@/lib/prisma";
import { DatabaseResponse, PostsWithCounts } from "@/types/types";
import Profile from "./Profile";

interface PostsConstructor {
  currentCursor?: string;
  postsPerPage?: number;
  orderBy?: { [K in keyof Post]?: "asc" | "desc" };
  userId?: string; // Optional userId to filter posts by user
  postId?: string;
  onlyBookMarked?: boolean;
  onlyFollowingPosts?: boolean;
  isOwner: boolean;
}

export default class Posts {
  public postsPerPage: number | undefined;
  public orderBy: { [K in keyof Post]?: "asc" | "desc" };
  private currentCursor: string | undefined;
  private userId?: string; // Optional userId to filter posts by user
  private postId?: string;
  public onlyBookMarked?: boolean;
  public onlyFollowingPosts?: boolean;
  public isOwner: boolean;


  constructor({
    currentCursor,
    postsPerPage,
    orderBy = { id: "asc" },
    userId,
    postId,
    onlyBookMarked,
    onlyFollowingPosts,
    isOwner
  }: PostsConstructor) {
    this.postsPerPage = postsPerPage ? postsPerPage : undefined;
    this.orderBy = orderBy;
    this.currentCursor = currentCursor ? currentCursor : undefined;
    this.userId = userId;
    this.postId = postId;
    this.onlyBookMarked = onlyBookMarked ? onlyBookMarked : false;
    this.onlyFollowingPosts = onlyFollowingPosts ? onlyFollowingPosts : false;
    this.isOwner = isOwner
  }

  public async fetchPosts(): Promise<
    DatabaseResponse<{
      posts: PostsWithCounts[];
      metaData: { lastCursor: undefined | string; hasNextPage: boolean };
    }>
  > {
    const orderBy = [
      { ...this.orderBy },
      { id: this.orderBy.id ? this.orderBy.id : "asc" } // Ensure id is included in orderBy
    ];
    
    const followingIds = this.userId ? (await new Profile({ id: this.userId }).following()).data?.map(f => f.followingId).filter(id => id !== undefined) || [] : []


    let result = await prisma.post.findMany({
      take: this.postsPerPage,
      ...(this.currentCursor && {
        skip: 1, // Do not include the cursor itself in the query result
        cursor: {
          id: this.currentCursor as string,
        },
      }),
      orderBy,
      where: {
        ...(this.userId && {
          ...(this.onlyBookMarked
            ? {
                bookmarks: {
                  some: {
                    userId: this.userId,
                  },
                },
              }
            : {}),
        }),
        ...(this.userId && !this.onlyBookMarked && { authorId: this.userId }),
        ...(this.onlyFollowingPosts && {
          authorId: { in: followingIds },
          isRestricted: false
        }),
        ...(this.isOwner === false && {
          isRestricted: false
        })
      },
      select: {
        id: true,
        title: true,
        bookmarks: this.onlyBookMarked
          ? undefined
          : {
              select: {
                userId: true,
              },
            },
        content: true,
        createdAt: true,
        viewsNumber: true,
        likes: true,
        disLikes: true,
        updatedAt: true,
        authorId: true,
        language: true,
        isRestricted: true,
        reason: true,
        author: {
          select: {
            name: true,
            email: true,
            image: true,
            id: true
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    // If there are no results, return early with the appropriate response
    if (result.length === 0) {
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

    // Determine if the posts are bookmarked by the user
    const postsWithBookmarks = result.map((post) => ({
      ...post,
      isBookmarked:
        post.bookmarks?.some((bookmark) => bookmark.userId === this.userId) ||
        false,
    }));

    // Determine the last cursor
    const lastPostInResults = result[result.length - 1];
    const cursor: string = lastPostInResults.id;

    // Fetch the next page to determine if there is another page
    const nextPage = await prisma.post.findMany({
      take: this.postsPerPage || 3,
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: cursor,
      },
      where: {
        ...(this.userId && {
          ...(this.onlyBookMarked
            ? {
                bookmarks: {
                  some: {
                    userId: this.userId,
                  },
                },
              }
            : {}),
        }),
      },
    });
    // Return the response with the posts and metadata
    return {
      data: {
        posts: postsWithBookmarks,
        metaData: {
          lastCursor: cursor,
          hasNextPage: nextPage.length > 0,
        },
      },
      success: true,
      error: null,
    };
  }

  public async deletePost(): Promise<DatabaseResponse> {
    await prisma.post.delete({
      where: {
        id: this.postId,
        authorId: this.userId
      },
    });

    return {
      data: null,
      success: true,
      error: null,
    };
  }

  public async bookmarkPost(): Promise<DatabaseResponse> {
    await prisma.bookmark.create({
      data: {
        userId: this.userId as string,
        postId: this.postId as string,
      },
    });

    return {
      data: null,
      success: true,
      error: null,
    };
  }

  public async unBookmarkPost(): Promise<DatabaseResponse> {
    await prisma.bookmark.deleteMany({
      where: {
        userId: this.userId,
        postId: this.postId,
      },
    });

    return {
      data: null,
      success: true,
      error: null,
    };
  }
}
