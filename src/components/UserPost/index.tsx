"use client"

import { useEffect, useState } from "react";
import { PostWithAuthor } from "@/types/types";
import PostHeader from "./PostHeader";
import PostStats from "./PostStats";
import PostActions from "./PostActions";
import useIsBookmarked from "@/hooks/useIsBookmarked";
import Link from "next/link"
import routes from "@/services/routes";

interface UserPostProps {
  viewerId: string;
  isOwner: boolean;
  post: PostWithAuthor;
}

export default function UserPost({ viewerId, isOwner, post }: UserPostProps) {
  const { data: bookmarked } = useIsBookmarked(viewerId, post.id);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    if (bookmarked !== undefined) {
      setIsBookmarked(bookmarked);
    }
  }, [bookmarked]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(prev => !prev)
  };
  const handlePostDelete = () => setIsDeleted(true);

  if (isDeleted) {
    return null;
  }

  return (
    <div className="flex w-full p-6">
      <Link href={`${routes.post.index.path}`} className="flex flex-col w-full gap-5">
        <PostHeader
          authorImage={post.author.image}
          title={post.title}
          status={post.status}
          createdAt={post.createdAt}
        />
        <PostStats
          comments={post._count.comments}
          viewsNumber={post.viewsNumber}
          likes={post.likes}
          dislikes={post.disLikes}
        />
      </Link>
      <PostActions
        viewerId={viewerId}
        postId={post.id}
        isOwner={isOwner}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
        onDelete={handlePostDelete}
      />
    </div>
  );
}
