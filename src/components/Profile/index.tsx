"use client";

import { FC } from "react";
import ProfileActions from "./ProfileAction";
import ProfileInfo from "./ProfileInfo";
import ProfileDetails from "./ProfileDetails";  // Import the custom hook
import ProfileImage from "@/components/ProfileImage";

interface ProfileHeaderProps {
  name: string;
  email: string;
  bio?: string;
  createdAt: Date;
  links?: string[];
  postsCount: number;
  image: string;
  points: number;
  isOwner: boolean;
}

const DashboardProfileHeader: FC<ProfileHeaderProps> = ({
  name,
  email,
  bio,
  createdAt,
  links,
  postsCount,
  image,
  points,
  isOwner,
}) => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="relative w-full flex flex-col">
        <div className="decorator h-[40vh]" />
        <ProfileActions
          isOwner={isOwner}
        />
        <div className="absolute bottom-0 ml-5 w-32">
          <ProfileImage size={32} img={image} />
        </div>
      </div>
      <div className="px-5">
      <ProfileInfo name={name} email={email}  points={points} />
      <ProfileDetails
        bio={bio}
        createdAt={createdAt}
        links={links}
        postsCount={postsCount}
      />
        </div>

    </div>
  );
};

export default DashboardProfileHeader;
