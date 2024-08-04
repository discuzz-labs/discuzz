import useUserPosts from "@/hooks/useUserPosts";
import UserPost from "@/components/UserPost";
import usePostFilter from "@/hooks/useFilter";

interface UserPostsProps {
  userId: string;
  isOwner: boolean;
  viewerId: string;
}
export default function UserPosts({
  viewerId,
  userId,
  isOwner,
}: UserPostsProps) {
  const { currentFilters } = usePostFilter();
  const { ref, posts } = useUserPosts({
    userId,
    isOwner,
    filter: currentFilters,
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-10 space-2 mt-10">
        {posts &&
          posts.pages.map((page) => {
            if (page?.posts.length === 0) return <div>
              <p className="text-center text-gray-500">No posts found.</p>
            </div>;
            return page?.posts.map((post) => (
              <UserPost
                key={post.id}
                isOwner={isOwner}
                viewerId={viewerId}
                post={post}
              />
            ));
          })}
      </div>
      <span ref={ref} style={{ visibility: "hidden" }}>
        intersection observer marker
      </span>
    </div>
  );
}
