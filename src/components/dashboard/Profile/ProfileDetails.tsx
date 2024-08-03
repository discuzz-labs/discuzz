import Link from "next/link";
import { CalendarDays, Link2 } from "lucide-react";

interface ProfileDetailsProps {
  bio?: string;
  createdAt: Date;
  links?: string[];
  followerCount: number;
  followingCount: number;
}

export default function ProfileDetails({
  bio,
  createdAt,
  links,
  followerCount,
  followingCount
}: ProfileDetailsProps) {
  return (
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
          {followerCount} <span className="hover:underline text-muted-foreground">Followers</span>
        </Link>
        <Link href="/following">
          {followingCount} <span className="hover:underline text-muted-foreground">Following</span>
        </Link>
      </div>
    </div>
  );
}
