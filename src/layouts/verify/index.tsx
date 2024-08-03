"use client";

import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { VerifyEmailFormSchema } from "@/services/schemas";
import AuthForm from "@/components/AuthForm";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import SuccessBoundary from "@/components/SuccessBoundary";

export default function VerifyLayout() {
  const translate = useTranslations("verify");
  const translateError = useTranslations("messages.error");
  const translateSuccess = useTranslations("messages.success");

  const { data: userSession } = useSession();
  const { isError, error, isSuccess, isPending, mutate } = useVerifyEmail(userSession?.user.email);

  return (
    <AuthLayoutStyle>
      <Header content={translate("title")} caption={translate("titleCaption")} />
      {isError && <Alert message={translateError(error.message)} type="error" />}
      <SuccessBoundary
        isSuccess={isSuccess}
        message={translateSuccess("VERIFICATION_SUCCESS_EMAIL_SENT")}
      />
      <AuthForm
        schema={VerifyEmailFormSchema}
        formSubmitted={isPending}
        fields={[]}
        callbackFn={() => mutate()}
        submitBtnText={translate("submitBtnText")}
      />
    </AuthLayoutStyle>
  );
}
