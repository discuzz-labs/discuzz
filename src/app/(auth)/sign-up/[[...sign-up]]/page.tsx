"use client";

import config from "@/lib/config";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="py-10 flex items-center justify-center w-[100vw] h-full">
      <SignUp
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
