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
    if (!userSession || !userSession.email) {
      router.push(routes.auth.signIn.path);
    }
  }, [userSession, router]);

  if (userSession && userSession.email) {
    return <>{children}</>;
  }

  return <Loading />; // Render nothing or a loading spinner while redirecting
}
