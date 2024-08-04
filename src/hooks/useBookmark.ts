"use client"

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import bookmarkPost, { bookmarkPostArgs } from "@/actions/posts/bookmarkPost";

const useBookmark = () => {
  const {toast} = useToast();
  return useMutation<
    null,
    Error,
    bookmarkPostArgs
  >({
    mutationFn: bookmarkPost,
    onSuccess: () => {
      toast({
        title: "Post bookmarked successfully."
      })
    },
    onError: () => {
      toast({
        title: "Post cannot be bookmarked."
      })
    },
  });
};

export default useBookmark;
