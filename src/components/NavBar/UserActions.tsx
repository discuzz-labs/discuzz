import {
  BellIcon,
  Cloud,
  LogOut,
  MessageSquare,
  Pen,
  Trophy,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileImage from "../ProfileImage";
import { useSession, signOut } from "next-auth/react";
import routes from "@/services/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserActionsProps {
  userName: string;
}

export function UserActions({ userName }: UserActionsProps) {
  const { data: userSession } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <ProfileImage size={10} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="truncate">
          {userName} Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`${routes.user.index.path}/${userSession?.user.id}`}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>

          <Link href={`${routes.user.notifications.path}`}>
            <DropdownMenuItem>
              <BellIcon className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
          </Link>

          <Link href={`${routes.user.settings.path}`}>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href={`${routes.user.index.path}/${userSession?.user.id}`}>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              Posts
            </DropdownMenuItem>
          </Link>
          <Link href={`${routes.post.new.path}`}>
            <DropdownMenuItem>
              <Pen className="mr-2 h-4 w-4" />
              New Post
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <Link href={`${routes.user.history.path}`}>
          <DropdownMenuItem>
            <Cloud className="mr-2 h-4 w-4" />
            History
          </DropdownMenuItem>
        </Link>
        <Link href={`${routes.user.leaderboard.path}`}>
          <DropdownMenuItem>
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            className="w-full text-destructive-foreground bg-destructive p-0"
            onClick={() => signOut()}
          >
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
