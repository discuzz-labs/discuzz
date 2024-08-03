import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import follow, { followArgs } from "@/actions/user/follow";
import unFollow, { unFollowArgs } from "@/actions/user/unFollow";
import config from "@/lib/config";

// Custom hook for profile mutations
export function useProfileMutations() {
  const { toast } = useToast();


  const followMutation = useMutation({
    mutationFn: (args: followArgs) => follow(args),
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Followed successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to follow user",
        description: `Contact our support ${config.site.supportEmail}.`,
      });
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: (args: unFollowArgs) => unFollow(args),
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Unfollowed successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to unfollow user",
        description: `Contact our support ${config.site.supportEmail}.`,
      });
    },
  });

  return {
    followMutation,
    unFollowMutation,
  };
}
