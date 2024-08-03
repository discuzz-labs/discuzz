"use client";

import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import { Check } from "lucide-react";
import Alert from "@/components/Alert";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";
import { ResetPasswordFormSchemaFirstStep } from "@/services/schemas";
import useResetPassword from "@/hooks/useResetPassword";
import SuccessBoundary from "@/components/SuccessBoundary";
import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";

export default function ResetPasswordLayout() {
  const translate = useTranslations("reset.password");
  const translateError = useTranslations("messages.error");
  const translateSuccess = useTranslations("messages.success");

  const { isError, error, isSuccess, isPending, mutate } = useResetPassword();

  return (
    <AuthLayoutStyle>
      <Header
        content={translate("title")}
        caption={translate("titleCaption")}
      />
      <ErrorBoundary
        isError={isError}
        errorComponent={
          <Alert message={translateError(error?.message)} type="error" />
        }
      >
        {isPending && (
          <div className="flex gap-2">
            <Spinner /> {translate("VERIFICATION_VERIFYING_EMAIL")}
          </div>
        )}
        <SuccessBoundary
          isSuccess={isSuccess}
          message={translateSuccess("RESETPASSWORD_SUCCESS_EMAIL_SENT")}
        />
        <AuthForm
          schema={ResetPasswordFormSchemaFirstStep}
          formSubmitted={isPending}
          callbackFn={mutate}
          fields={[
            {
              name: "email",
              placeholder: translate("emailPlaceholder"),
              type: "email",
            },
          ]}
          submitBtnText={translate("submitBtnText")}
        />
      </ErrorBoundary>
    </AuthLayoutStyle>
  );
}
