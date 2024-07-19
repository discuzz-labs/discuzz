"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loading from "@/components/Loading"
import routes from "@/services/routes";
import { useSession } from "next-auth/react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: userSession } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (userSession) {
      if (userSession.user.verified) {
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
