import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FollowButtonProps {
  isFollowed: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowed,
  onFollow,
  onUnfollow,
}) => {
  return isFollowed ? (
    <Button variant="default" onClick={onUnfollow}>
      Unfollow
    </Button>
  ) : (
    <Button variant="default" onClick={onFollow}>
      Follow
    </Button>
  );
};

export const EditProfileButton: React.FC = () => (
  <Button variant="outline">
    <Link href="/settings">Edit Profile</Link>
  </Button>
);
