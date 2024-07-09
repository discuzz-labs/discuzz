import { Button } from "../ui/button";
import { LogIn, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { useUserSession } from "../providers/AuthProvider";
import ProfileImage from "../ProfileImage";

export default function UserActions() {
  const { userSession } = useUserSession();
  return (
    <>
      {userSession?.email == null ? (
        <>
          <Link href="/sign-in">
            <Button variant="ghost" className="flex items-center gap-2">
              <LogIn size={20} />
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="flex items-center gap-2 dark:bg-white">
              <UserRoundPlus size={20} />
              Sign Up
            </Button>
          </Link>
        </>
      ) : (
        <ProfileImage size={10} />
      )}
    </>
  );
}
