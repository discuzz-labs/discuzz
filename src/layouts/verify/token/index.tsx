"use client";

import Header from "@/components/Header";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";
import useVerifyUserEmail from "@/hooks/useVerifyUserEmail";
import { useEffect } from "react";
import routes from "@/services/routes";

interface VerifyTokenLayoutProps {
  token: string;
}

export default function VerifyTokenLayout({ token }: VerifyTokenLayoutProps) {
  const router = useRouter();
  const translateError = useTranslations("messages.error");
  const translatePending = useTranslations("messages.pending");

  const { data: userSession, update } = useSession();
  const { isError, isSuccess, isFetching, error } = useVerifyUserEmail(token);

  useEffect(() => {
    const handleUpdateSession = async () => {
      if (isSuccess && userSession) {
        await update({ verified: true });
        router.push(`${routes.redirects.onAfterVerify}/${userSession.user.id}`);
      }
    };
    handleUpdateSession();
  }, [isSuccess, userSession, update, router]);

  return (
    <AuthLayoutStyle>
      <Header content="Verification" caption="Verify your email." />
      {isError && (
        <Alert type="error" className="lg:w-1/3">
          {translateError(error?.message || "An error occurred")}
        </Alert>
      )}
      {isFetching && (
        <div className="flex gap-2">
          <Spinner /> {translatePending("VERIFICATION_VERIFYING_EMAIL")}
        </div>
      )}
    </AuthLayoutStyle>
  );
}
