import getUserPosts from "@/actions/posts/getUserPosts";
import LoadingBoundary from "@/components/LoadingBoundary";
import DashboardPostCard from "@/components/dashboard/PostCard";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ErrorBoundary from "../../ErrorBoundary";
import { TABS, FILTER, ORDER } from "@/app/(user)/user/[userId]/routeType";

interface DashboardPostsProps {
  userId: string;
  activeTab: keyof typeof TABS;
  filter: keyof typeof FILTER;
  order: keyof typeof ORDER;
}

export default function DashboardPosts({
  userId,
  activeTab,
  filter,
  order
}: DashboardPostsProps) {
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
    queryKey: ["userPosts", userId, activeTab, filter, order],
    queryFn: ({ pageParam }) =>
      getUserPosts({
        userId,
        cursor: pageParam,
        onlyBookMarked: activeTab === TABS.BOOKMARKED,
        onlyFollowingPosts: activeTab === TABS.FOLLOWING,
        orderBy: filter ? { [filter]: order } : { createdAt: "asc" }
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.metaData.lastCursor,
  });

  useEffect(() => {
    console.log(inView);
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  let noPostsMessage =
    "No posts yet. Start contributing to the community by creating your first post!";
  if (activeTab === TABS.BOOKMARKED) {
    noPostsMessage =
      "You have no bookmarked posts. Start bookmarking posts to see them here!";
  } else if (activeTab === TABS.FOLLOWING) {
    noPostsMessage =
      "You are not following anyone. Follow users to see their posts here!";
  }
  console.log(filter, order)
  return (
    <div className="flex flex-col p-2 pt-10">
      {!isPending  && !data?.pages.some(page => page.posts.length > 0) && (
        <div className="flex flex-col gap-5 items-center justify-center py-10">
          {noPostsMessage}
          <Button variant={"default"} className="flex items-center gap-2">
            <Pen className="h-4 w-4" /> New Post
          </Button>
        </div>
      )}

      {data &&
        data.pages &&
        data.pages.map((page) =>
          page.posts.map((postData, idx) => (
            <DashboardPostCard
              key={idx}
              postId={postData.id}
              userId={postData.author.id}
              name={postData.author.name}
              email={postData.author.email}
              content={postData.content}
              viewsNumber={postData.viewsNumber}
              likes={postData.likes}
              disLikes={postData.disLikes}
              commentsCount={postData._count.comments}
              createdAt={postData.createdAt}
              isBookMarked={postData.isBookmarked}
              isRestricted={postData.isRestricted}
              reason={postData.reason}
              activeTab={activeTab}
              image={postData.author.image}
            />
          ))
        )}

      {(isPending || isFetchingNextPage) && !isError && <LoadingBoundary />}
      <ErrorBoundary
        isError={isError}
        errorComponent={<p>{error?.message}a</p>}
      />

      <span ref={ref} style={{ visibility: "hidden" }}>
        intersection observer marker
      </span>
    </div>
  );
}
