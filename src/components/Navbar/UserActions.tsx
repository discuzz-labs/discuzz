import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogIn, UserRoundPlus } from "lucide-react";
import Link from "next/link";

export default function UserActions() {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
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
      </SignedOut>
    </>
  );
}
