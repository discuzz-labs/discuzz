import { FC } from "react";
import ProfileInfo from "./ProfileInfo";
import RestrictedBadge from "./RestrictedBadge";

interface ProfileHeaderProps {
  name: string;
  email: string;
  createdAt: Date;
  isRestricted: boolean;
  reason: string;
  image: string;
  userId: string;
}

const PostHeader: FC<ProfileHeaderProps> = ({
  isRestricted,
  name,
  email,
  createdAt,
  image,
  reason,
  userId
}) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <ProfileInfo createdAt={createdAt} name={name} email={email} image={image} userId={userId} />
      {isRestricted && (
        <div className="ml-auto">
          <RestrictedBadge reason={reason} />
        </div>
      )}
    </div>
  );
};

export default PostHeader;
