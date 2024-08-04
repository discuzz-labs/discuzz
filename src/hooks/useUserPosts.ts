"use client"

import { useInfiniteQuery } from "@tanstack/react-query";
import getUserPosts from "@/actions/user/getUserPosts";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CurrentFilters } from "./useFilter";

interface useUserPostsProps {
  userId: string;
  isOwner: boolean;
  filter: CurrentFilters;
}

const useUserPosts = ({
  userId,
  isOwner,
  filter
}: useUserPostsProps) => {
  const { ref, inView } = useInView();

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
    data,
  } = useInfiniteQuery({
    queryKey: ["userPosts", { userId, filter }],
    queryFn: ({ pageParam }) =>
      getUserPosts({
        userId,
        cursor: pageParam,
        isOwner,
        filter,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.metaData.lastCursor,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return {
    isFetchingNextPage,
    isPending,
    isError,
    error,
    posts: data,
    ref,
  };
};

export default useUserPosts