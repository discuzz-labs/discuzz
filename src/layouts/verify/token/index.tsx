"use client";

import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Spinner from "@/components/Spinner";
import { PENDING } from "@/lib/messages";
import verifyToken from "@/actions/verifyToken";
import verifyUser from "@/actions/verify/verifyUser";
import routes from "@/services/routes";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface VerifyTokenLayoutProps {
  token: string;
}

export default function VerifyTokenLayout({ token }: VerifyTokenLayoutProps) {
  const router = useRouter();
  const { data: userSession, update } = useSession();

  const verifyUserEmail = async (): Promise<boolean> => {
    const verifyTokenAction = await verifyToken({
      token,
    });
    if (verifyTokenAction.success === false || !verifyTokenAction.data) {
      throw new Error(verifyTokenAction.error);
    }

    const verifyUserAction = await verifyUser({
      email: verifyTokenAction.data.email,
    });
    if (verifyUserAction.success === false) {
      throw new Error(verifyUserAction.error);
    }
    return true;
  };

  const { isError, isSuccess, isPending, error } = useQuery({
    queryKey: ["verifyUserEmail"],
    queryFn: verifyUserEmail,
    retry: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const handleUpdateSession = async () => {
      if (isSuccess) {
        if (userSession) {
          console.log("hello")
          await update({ verified: true });
          router.push(routes.redirects.onAfterVerify)
        }
      }
    };
    handleUpdateSession();
  }, [isSuccess]);

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center">
      <Header content="Verification" caption="Verify your email." />
      {isError && (
        <Alert type="error" className="lg:w-1/3">
          <ShieldAlert /> {error.message}
        </Alert>
      )}

      {isPending === true && (
        <div className="flex gap-2">
          <Spinner /> {PENDING.VERIFICATION_VERIFYING_EMAIL}
        </div>
      )}
    </div>
  );
}
