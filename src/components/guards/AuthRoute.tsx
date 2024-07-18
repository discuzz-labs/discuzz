"use client";
import { useUserSession } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loading from "@/components/Loading"
import routes from "@/services/routes";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { userSession } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    if (userSession) {
      if (userSession.verified) {
        router.push(routes.user.dashboard.path);
      } else {
        router.push(routes.auth.verify.path);
      }
    }
  }, [userSession, router]);

  if (!userSession) {
    return <>{children}</>;
  }

  return <Loading />; // or a loading spinner if you prefer
}
