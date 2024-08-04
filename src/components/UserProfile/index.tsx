import { Button } from "@/components/ui/button";
import ProfileImage from "@/components/ProfileImage";
import Link from "next/link";
import { CalendarDays, Link2, Verified } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import getUserLevel, { minPointsToBeVerified } from "@/services/points";
import { UserWithCounts } from "@/types/types";
import routes from "@/services/routes";

interface UserProfileProps {
 user: UserWithCounts;
  isOwner: boolean;
}

export default function UserProfile({
  user,
  isOwner,
}: UserProfileProps) {
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="relative w-full flex flex-col">
        <div className="decorator h-[40vh]" />
        {isOwner && (
          <Link href={routes.user.settings.path} className="flex justify-end w-full px-5 py-2">
            <Button variant={"outline"}>Edit profile</Button>
          </Link>
        )}
        <div className="absolute bottom-0 ml-5 w-32">
          <ProfileImage size={32} img={user.image} />
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl flex justify-between items-center gap-5 font-bold">
              {user.name}
              {user.points >= minPointsToBeVerified && <Verified className="h-6 w-6 fill-blue-600" />}
            </p>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-end">
            <Badge>{getUserLevel(user.points).name}</Badge>
            <p className="text-muted-foreground text-xl">+{1000} Posts</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {user.bio ? <p>{user.bio}</p> : <p>No bio was provided</p>}
          <div className="flex items-center gap-5">
            <p className="flex items-center text-muted-foreground text-sm gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Joined on {user.createdAt.toLocaleDateString()}</span>
            </p>
            {user.links &&
              user.links.map((link, index) => (
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
            <span className="hover:underline text-muted-foreground">
              +{user._count.posts} Posts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
