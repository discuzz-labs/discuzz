"use client";

import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { useEffect } from "react";
import routes from "@/services/routes";
import LoadingBoundary from "@/components/LoadingBoundary";

interface VerifyTokenLayoutProps {
  token: string;
}

export default function VerifyTokenLayout({ token }: VerifyTokenLayoutProps) {
  const router = useRouter();
  const translateError = useTranslations("messages.error");

  const { data: userSession, update } = useSession();
  const { isError, isSuccess, isFetching, error } = useVerifyEmail(token);

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
      {isFetching && <LoadingBoundary />}
    </AuthLayoutStyle>
  );
}
