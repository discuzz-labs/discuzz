"use client";

import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Spinner from "@/components/Spinner";
import verifyToken from "@/actions/verifyToken";
import verifyUser from "@/actions/verify/verifyUser";
import routes from "@/services/routes";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";

interface VerifyTokenLayoutProps {
  token: string;
}

export default function VerifyTokenLayout({ token }: VerifyTokenLayoutProps) {
  const router = useRouter();
  const translateError = useTranslations("messages.error");
  const translatePending = useTranslations("messages.pending");

  const { data: userSession, update } = useSession();

  const { isError, isSuccess, isPending, error } = useQuery({
    queryKey: ["verifyUserEmail"],
    queryFn: async () => {
      const email = await verifyToken({
        token,
      });
      await verifyUser({
        email,
      });
    },
  });

  useEffect(() => {
    const handleUpdateSession = async () => {
      if (isSuccess) {
        if (userSession) {
          await update({ verified: true });
          router.push(
            `${routes.redirects.onAfterVerify}/${userSession.user.id}`
          );
        }
      }
    };
    handleUpdateSession();
  }, [isSuccess]);

  return (
    <AuthLayoutStyle>
      <Header content="Verification" caption="Verify your email." />
      {isError && (
        <Alert type="error" className="lg:w-1/3">
          <ShieldAlert /> {translateError(error.message)}
        </Alert>
      )}

      {isPending === true && (
        <div className="flex gap-2">
          <Spinner /> {translatePending("VERIFICATION_VERIFYING_EMAIL")}
        </div>
      )}
    </AuthLayoutStyle>
  );
}
