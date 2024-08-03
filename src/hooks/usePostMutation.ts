import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import config from "@/lib/config";
import deleteUserPost, { deleteUserPostArgs } from "@/actions/posts/deleteUserPost";
import bookmarkUserPost, { bookmarkUserPostArgs } from "@/actions/posts/bookmarkUserPost";
import unBookmarkUserPost, { unBookmarkUserPostArgs } from "@/actions/posts/unBookmarkUserPost";
import { TABS } from "@/app/(user)/user/[userId]/routeType";

export function usePostMutations(userId: string, postId: string, activeTab: keyof typeof TABS) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const invalidatePostQueries = () => {
    // Always invalidate the query for the active tab or handle EMPTY case explicitly
    if (activeTab === TABS.EMPTY) {
      // Handle EMPTY case separately if needed
      // Example: Invalidate all possible tabs if EMPTY indicates no specific tab
      Object.values(TABS).forEach(tab => {
        queryClient.invalidateQueries({ queryKey: ["userPosts", userId, tab] });
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: ["userPosts", userId, activeTab],
      });
    }
  };

  const deletePostMutation = useMutation<null, Error, deleteUserPostArgs>({
    mutationFn: deleteUserPost,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Post deleted successfully",
        description: "All related activity to this post is deleted!",
      });
      invalidatePostQueries();
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
      toast({
        variant: "default",
        title: "Post bookmarked successfully",
      });
      invalidatePostQueries();
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
      toast({
        variant: "default",
        title: "Post unbookmarked successfully",
      });
      invalidatePostQueries();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to unbookmark post",
        description: `Contact our support ${config.site.supportEmail}.`,
      });
    },
  });

  return { deletePostMutation, bookmarkMutation, unBookmarkMutation };
}
