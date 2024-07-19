import { Button } from "../ui/button";
import Link from "next/link";
import ProfileImage from "../ProfileImage";
import routes from "@/services/routes";
import { signOut, useSession } from "next-auth/react";

export default function UserActions() {
  const { data: userSession } = useSession();
  return (
    <>
      {userSession?.user.email == null ? (
        <>
          <Link href={routes.auth.signUp.path}>
            <Button className="flex items-center gap-2 dark:bg-white">
              Sign Up
            </Button>
          </Link>
          <Link href={routes.auth.signIn.path}>
            <Button variant="ghost" className="flex items-center gap-2">
              Sign In
            </Button>
          </Link>
        </>
      ) : (
        <>
        <ProfileImage size={10} />
        <button onClick={() => signOut()}>signout</button>
        </>
      )}
    </>
  );
}
