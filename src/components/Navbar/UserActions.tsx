import { Button } from "../ui/button";
import { LogIn, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { signIn } from "auth";
import { useSession } from "next-auth/react";

export default function UserActions() {
  const { data: session } = useSession();
  return (
    <>
      {session && session.user && <p>Signed In</p>}
      <Link href="/sign-in">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={async () => {
            await signIn();
          }}
        >
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
  );
}
