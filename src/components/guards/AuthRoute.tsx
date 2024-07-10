"use client";
import { useUserSession } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { userSession } = useUserSession();
  const router = useRouter();

  if (userSession) {
    return <>{children}</>;
  } else {
    if (!userSession.verified) router.push("/dashboard");
    else router.push("/verify");
  }
}
