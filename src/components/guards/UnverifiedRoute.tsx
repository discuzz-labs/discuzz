"use client";
import { useUserSession } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function UnverifiedRoute({ children }: { children: ReactNode }) {
  const { userSession } = useUserSession();
  const router = useRouter();

  if (userSession && userSession.email) {
    if (userSession.verified) router.push("/dashboard");
    else return <>{children}</>;
  } else {
    router.push("/sign-in");
  }
}
