import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogIn, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import config from "@/lib/config";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function UserActions() {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <SignedIn>
        <UserButton
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
            layout: {
              socialButtonsPlacement: config.clerk.socialButtonsPlacement,
              socialButtonsVariant: config.clerk.socialButtonsVariant,
            },
          }}
        />
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
