"use client";

import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { VerifyEmailFormSchema } from "@/services/schemas";
import AuthForm from "@/components/AuthForm";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";
import useVerifyEmailRequest from "@/hooks/useVerifyEmailRequest";
import SuccessBoundary from "@/components/SuccessBoundary";
import LoadingBoundary from "@/components/LoadingBoundary";

export default function VerifyLayout() {
  const translate = useTranslations("verify");
  const translateError = useTranslations("messages.error");
  const translateSuccess = useTranslations("messages.success");

  const { data: userSession } = useSession();
  const { isError, error, isSuccess, isPending, mutate } = useVerifyEmailRequest(userSession?.user.email);

  return (
    <AuthLayoutStyle>
      <Header content={translate("title")} caption={translate("titleCaption")} />
      {isPending && <LoadingBoundary />}
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
