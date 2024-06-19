"use client";

import config from "@/lib/config";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex items-center justify-center w-[100vw] h-full">
      <SignIn
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
          layout: {
            socialButtonsPlacement: config.clerk.socialButtonsPlacement,
            socialButtonsVariant: config.clerk.socialButtonsVariant,
            termsPageUrl: "/terms",
          },
        }}
      />
    </div>
  );
}
