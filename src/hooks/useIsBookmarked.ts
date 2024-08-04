import { useQuery } from "@tanstack/react-query";
import isBookmarkedPost from "@/actions/posts/isBookmarkedPost";

const useIsBookmarked = (userId: string, postId: string) => {
  return useQuery({
    queryKey: ["post", userId, postId],
    queryFn: () => isBookmarkedPost({ userId, postId }),
  });
};

export default useIsBookmarked;
