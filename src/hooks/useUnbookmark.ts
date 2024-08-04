"use client"

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import unBookmarkPost, { unBookmarkPostArgs } from "@/actions/posts/unBookmarkPost";

const useUnbookmark = () => {
  const {toast} = useToast();
  return useMutation<
    null,
    Error,
    unBookmarkPostArgs
  >({
    mutationFn: unBookmarkPost,
    onSuccess: () => {
      toast({
        title: "Post unbookmarked successfully."
      })
    },
    onError: () => {
      toast({
        title: "Post cannot be unbookmarked."
      })
    },
  });
};

export default useUnbookmark;
