"use client";
import { useUserSession } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loading from "@/components/Loading"

export default function UnverifiedRoute({ children }: { children: ReactNode }) {
  const { userSession } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    if (userSession) {
      if (userSession.verified) {
        router.push("/dashboard");
      }
    } else {
      router.push("/sign-in");
    }
  }, [userSession, router]);

  if (userSession && userSession.email && !userSession.verified) {
    return <>{children}</>;
  }

  return <Loading />; // Render nothing or a loading spinner while redirecting
}
