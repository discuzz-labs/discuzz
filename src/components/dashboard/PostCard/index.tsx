"use client"

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import config from "@/lib/config";
import LoadingBoundary from "@/components/LoadingBoundary";
import ErrorBoundary from "../../ErrorBoundary";
import deleteUserPost, { deleteUserPostArgs } from "@/actions/posts/deleteUserPost";
import bookmarkUserPost, { bookmarkUserPostArgs } from "@/actions/posts/bookmarkUserPost";
import unBookmarkUserPost, { unBookmarkUserPostArgs } from "@/actions/posts/unBookmarkUserPost";
import ProfileHeader from "./ProfileHeader";
import PostActions from "./PostActions";
import PostContent from "./PostContent";
import PostStats from "./PostStats";
import { TABS } from "@/app/(user)/user/[userId]/routeType";
import { useSession } from "next-auth/react";

interface DashboardPostCardProps {
  postId: string;
  userId: string;
  name: string;
  email: string;
  content: string;
  viewsNumber: number;
  likes: number;
  disLikes: number;
  commentsCount: number;
  ref?: (node?: Element | null) => void;
  createdAt: Date;
  isBookMarked: boolean;
  isRestricted: boolean;
  reason: string;
  image: string;
  activeTab: keyof typeof TABS;
  isOwner: boolean
}

export default function DashboardPostCard({
  userId,
  postId,
  name,
  email,
  content,
  viewsNumber,
  likes,
  disLikes,
  commentsCount,
  createdAt,
  isBookMarked,
  isRestricted,
  ref,
  reason,
  activeTab,
  image,
  isOwner
}: DashboardPostCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: userSession } = useSession()
  const [bookmarked, setBookmarked] = useState<boolean>(isBookMarked);

  const deletePostMutation = useMutation<null, Error, deleteUserPostArgs>({
    mutationFn: deleteUserPost,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Post deleted successfully",
        description: "All related activity to this post is deleted!",
      });
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId, TABS.POSTS] });
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId, TABS.BOOKMARKED] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Post cannot be deleted",
        description: `Contact our support ${config.site.supportEmail}.`,
      });
    },
  });
  
  const bookmarkMutation = useMutation<null, Error, bookmarkUserPostArgs>({
    mutationFn: bookmarkUserPost,
    onSuccess: () => {
      setBookmarked(true);
      toast({
        variant: "default",
        title: "Post bookmarked successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId, TABS.POSTS] });
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId, TABS.BOOKMARKED] });
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId, TABS.FOLLOWING] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to bookmark post",
        description: `Contact our support ${config.site.supportEmail}.`,
      });
    },
  });

  const unBookmarkMutation = useMutation<null, Error, unBookmarkUserPostArgs>({
    mutationFn: unBookmarkUserPost,
    onSuccess: () => {
      setBookmarked(false);
      toast({
        variant: "default",
        title: "Post unbookmarked successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId, TABS.POSTS] });
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId, TABS.BOOKMARKED] });
      queryClient.invalidateQueries({ queryKey: ["userPosts", userId, TABS.FOLLOWING] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to unbookmark post",
        description: `Contact our support ${config.site.supportEmail}.`,
      });
    },
  });

  const toggleBookmark = () => {
    if(userSession)
      if (bookmarked) {
        unBookmarkMutation.mutate({ userId: userSession?.user.id, postId });
      } else {
        bookmarkMutation.mutate({ userId: userSession?.user.id, postId });
      }
  };

  return (
    <div className="px-5 pb-20" ref={ref}>
      {(deletePostMutation.isPending || bookmarkMutation.isPending || unBookmarkMutation.isPending) && <LoadingBoundary />}
      <ErrorBoundary
        isError={deletePostMutation.isError || bookmarkMutation.isError || unBookmarkMutation.isError}
        errorComponent={
          deletePostMutation.isError ? (
            <p>{deletePostMutation.error?.message}</p>
          ) : bookmarkMutation.isError ? (
            <p>{bookmarkMutation.error?.message}</p>
          ) : unBookmarkMutation.isError ? (
            <p>{unBookmarkMutation.error?.message}</p>
          ) : null
        }
      >
      {(!deletePostMutation.isPending || !bookmarkMutation.isPending || !unBookmarkMutation.isPending) && (
          <div className={`flex flex-col gap-2 justify-center ${isRestricted ? "bg-destructive/20 p-2 rounded-sm" : ""}`}>
            <div className="flex items-center gap-5">
            <ProfileHeader userId={userId} image={image} name={name} email={email} createdAt={createdAt} reason={reason} isRestricted={isRestricted}/>
            <PostActions
            isOwner={isOwner}
              isBookMarked={bookmarked}
              onToggleBookmark={toggleBookmark}
              onDelete={() => deletePostMutation.mutate({ postId, userId })}
              activeTab={activeTab}
            />
            </div>
            <PostContent content={content} />
            <PostStats
              viewsNumber={viewsNumber}
              likes={likes}
              disLikes={disLikes}
              commentsCount={commentsCount}
            />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}
