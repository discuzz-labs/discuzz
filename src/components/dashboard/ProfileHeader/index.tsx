import { Button } from "@/components/ui/button";
import ProfileImage from "@/components/ProfileImage";
import Link from "next/link";
import { CalendarDays, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import getUserLevel from "@/services/points"

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
}

export default function DashboardProfileHeader({
  name,
  email,
  bio,
  createdAt,
  links,
  followerCount,
  followingCount,
  image,
  points
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="relative w-full flex flex-col">
        <div className="decorator h-[40vh]" />
        <div className="flex justify-end w-full px-5 py-2">
          <Button variant={"outline"}>Edit profile</Button>
        </div>
        <div className="absolute bottom-0 ml-5 w-32">
          <ProfileImage size={32} img={image} />
        </div>
      </div>
      <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{name}</p>
            <p className="text-muted-foreground">{email}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-end">
            <Badge>{getUserLevel(points).name}</Badge>
            <p className="text-muted-foreground text-xl">+{1000} Posts</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {bio ? <p>{bio}</p> : <p>No bio was provided</p>}
          <div className="flex items-center gap-5">
            <p className="flex items-center text-muted-foreground text-sm gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Joined on {createdAt.toLocaleDateString()}</span>
            </p>
            {links &&
              links.map((link, index) => (
                <Link
                  href={link}
                  className="flex items-center text-blue-600 text-sm gap-2"
                  key={index}
                >
                  <Link2 className="h-4 w-4" /> {link}
                </Link>
              ))}
          </div>
          <div className="flex items-center gap-5">
            <Link href="/followers">
              {followerCount}{" "}
              <span className="hover:underline text-muted-foreground">
                Followers
              </span>
            </Link>
            <Link href="/following">
              {followingCount}{" "}
              <span className="hover:underline text-muted-foreground">
                Following
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
