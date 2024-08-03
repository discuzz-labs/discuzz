"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import LoadingBoundary from "@/components/LoadingBoundary";
import ErrorBoundary from "../../ErrorBoundary";
import { usePostMutations } from "@/hooks/usePostMutation";
import { useCombinedMutationState } from "@/hooks/useCombinedMutationState";
import PostHeader from "@/components/dashboard/PostHeader";
import PostActions from "@/components/dashboard/PostActions";
import PostContent from "./PostContent";
import PostStats from "@/components/dashboard/PostStates";
import { TABS } from "@/app/(user)/user/[userId]/routeType";

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
  isOwner: boolean;
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
  isOwner,
}: DashboardPostCardProps) {
  const { data: userSession } = useSession();
  const [bookmarked, setBookmarked] = useState<boolean>(isBookMarked);
  const { deletePostMutation, bookmarkMutation, unBookmarkMutation } = usePostMutations(userId, postId, activeTab);
  const { isLoading, isError, error } = useCombinedMutationState(
    deletePostMutation,
    bookmarkMutation,
    unBookmarkMutation
  );

  const toggleBookmark = () => {
    if (userSession) {
      if (bookmarked) {
        unBookmarkMutation.mutate({ userId: userSession.user.id, postId });
        setBookmarked(false)
      } else {
        bookmarkMutation.mutate({ userId: userSession.user.id, postId });
        setBookmarked(true)
      }
    }
  };

  return (
    <div className="px-5 pb-20" ref={ref}>
      {isLoading && <LoadingBoundary />}
      <ErrorBoundary
        isError={isError}
        errorComponent={<p>{error?.message}</p>}
      >
        {!isLoading && (
          <div className={`flex flex-col gap-2 justify-center ${isRestricted ? "bg-destructive/20 p-2 rounded-sm" : ""}`}>
            <div className="flex items-center gap-5">
              <PostHeader
                userId={userId}
                image={image}
                name={name}
                email={email}
                createdAt={createdAt}
                reason={reason}
                isRestricted={isRestricted}
              />
              <PostActions
                isOwner={isOwner}
                isBookMarked={bookmarked}
                onToggleBookmark={toggleBookmark}
                onDelete={() => deletePostMutation.mutate({ postId, userId })}
                activeTab={activeTab}
              />
            </div>
            <PostContent content={content} />
            <PostStats viewsNumber={viewsNumber} likes={likes} disLikes={disLikes} commentsCount={commentsCount} />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}
