"use client";

import { FC, useEffect, useState } from "react";
import ProfileActions from "./ProfileAction";
import ProfileInfo from "./ProfileInfo";
import ProfileDetails from "./ProfileDetails";  // Import the custom hook
import ProfileImage from "@/components/ProfileImage";
import isFollowing from "@/actions/user/isFollowing";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  bio?: string;
  createdAt: Date;
  links?: string[];
  followerCount: number;
  followingCount: number;
  image: string;
  points: number;
  isOwner: boolean;
  userId: string;
}

const DashboardProfileHeader: FC<ProfileHeaderProps> = ({
  name,
  email,
  bio,
  createdAt,
  links,
  followerCount,
  followingCount,
  image,
  points,
  isOwner,
  userId
}) => {
  const { data: userSession } = useSession()
  const [isFollowed, setIsFollowed] = useState(false);
  const { data: following } = useQuery({
    queryKey: ["isFollowing", userId, userSession?.user.id],
    queryFn: () => isFollowing({ id: userSession?.user.id as string, followingUserId: userId }),
    enabled: !!userSession
   });
   useEffect(() => {
    if (following !== undefined) {
      setIsFollowed(following);
    }
  }, [following]); 

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="relative w-full flex flex-col">
        <div className="decorator h-[40vh]" />
        <ProfileActions
          userId={userId}
          isOwner={isOwner}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
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
        followerCount={followerCount}
        followingCount={followingCount}
      />
        </div>

    </div>
  );
};

export default DashboardProfileHeader;
