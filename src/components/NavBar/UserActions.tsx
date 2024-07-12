import { Button } from "../ui/button";
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
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="flex items-center gap-2 dark:bg-white">
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
