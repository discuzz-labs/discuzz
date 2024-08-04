import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface UserProfileActionsProps {
  isOwner: boolean;
}

const ProfileActions: FC<UserProfileActionsProps> = ({
  isOwner,
}) => {
  return (
    <div className="flex justify-end w-full px-5 py-2">
      {isOwner &&
        <Button variant="outline">Edit Profile</Button>
      }
    </div>
  );
};

export default ProfileActions;
