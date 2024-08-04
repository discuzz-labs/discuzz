"use client"

import { QueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import deletePost, { deletePostArgs } from "@/actions/posts/deletePost";

const useDeletePost = (userId: string) => {
  const {toast} = useToast();
  return useMutation<
    null,
    Error,
    deletePostArgs
  >({
    mutationFn: deletePost,
    onSuccess: () => {
      new QueryClient().invalidateQueries({
        queryKey: ["userInfo", userId]
      })
      toast({
        title: "Post deleted successfully."
      })
    },
    onError: () => {
      toast({
        title: "Post cannot be deleted."
      })
    },
  });
};

export default useDeletePost;
