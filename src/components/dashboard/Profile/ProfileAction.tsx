import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useProfileMutations } from "@/hooks/useProfileMutation";
import { useSession } from "next-auth/react";

interface UserProfileActionsProps {
  isOwner: boolean;
  isFollowed: boolean;
  userId: string;
  setIsFollowed: (state: boolean) => void;
}

const ProfileActions: FC<UserProfileActionsProps> = ({
  isOwner,
  isFollowed,
  userId,
  setIsFollowed
}) => {
  const { data: userSession } = useSession();
  const { followMutation, unFollowMutation } = useProfileMutations();

  const handleFollow = () => {
    followMutation.mutate({
      id: userSession?.user.id as string,
      followingUserId: userId,
    });
    setIsFollowed(true)
  };
  
  const handleUnfollow = () => {
    unFollowMutation.mutate({
      id: userSession?.user.id as string,
      followingUserId: userId,
    });
    setIsFollowed(false)
  };

  return (
    <div className="flex justify-end w-full px-5 py-2">
      {isOwner ? (
        <Button variant="outline">Edit Profile</Button>
      ) : isFollowed ? (
        <Button
          variant="default"
          onClick={handleUnfollow}
          disabled={unFollowMutation.isPending}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          variant="default"
          onClick={handleFollow}
          disabled={followMutation.isPending}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default ProfileActions;
