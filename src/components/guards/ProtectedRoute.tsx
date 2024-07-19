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
    if (!userSession || !userSession.user.email) {
      router.push(routes.auth.signIn.path);
    }
  }, [userSession, router]);

  if (userSession && userSession.user.email) {
    return <>{children}</>;
  }

  return <Loading />; // Render nothing or a loading spinner while redirecting
}
