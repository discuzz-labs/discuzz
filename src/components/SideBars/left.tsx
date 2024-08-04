import { Bell, LayoutGrid, Trophy, Pen, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import routes from "@/services/routes";
import Link from "next/link";
import ProfileImage from "../ProfileImage";

export default function LeftSideBar() {
  const { data: userSession } = useSession()

  return (
    <div className="w-[17%] flex flex-col p-2 fixed left-0 h-[90vh] top-[10vh]">
      <div className="flex-grow">
        <Link href={routes.home} className="p-2 rounded-sm hover:bg-muted gap-2 flex items-center">
          <LayoutGrid className="h-5 w-5" />
          <p>Home</p>
        </Link>

        <Link href={routes.user.leaderboard.path} className="p-2 rounded-sm hover:bg-muted gap-2 flex items-center">
          <Trophy className="h-5 w-5" />
          <p>Leaderboard</p>
        </Link>

        <Link href={routes.user.notifications.path} className="p-2 rounded-sm hover:bg-muted gap-2 flex items-center">
          <Bell className="h-5 w-5" />
          <p>Notifications</p>
        </Link>

        <Link href={routes.post.new.path} className="p-2 rounded-sm hover:bg-muted gap-2 flex items-center">
           <Pen className="h-5 w-5"/> New Post
        </Link>
      </div>

      <div>
        <Link href={`${routes.user.index.path}/${userSession?.user.id}`} className="p-2 rounded-sm hover:bg-muted gap-2 flex items-center">
          <ProfileImage size={5}/>
          <p className="truncate">{userSession?.user.name}</p>
        </Link>
        <Link
          href={`${routes.user.settings.path}`}
          className="p-2 rounded-sm hover:bg-muted gap-2 flex items-center"
        >
          <Settings className="h-5 w-5" />
          <p>Settings</p>
        </Link>
        <div
          className="cursor-pointer hover:bg-destructive p-2 rounded-sm gap-2 flex items-center"
          onClick={() => signOut()}
        >
          <LogOut /> Log out
        </div>
      </div>
    </div>
  );
}
