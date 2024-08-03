"use client";

import Header from "@/components/Header";
import AuthForm from "@/components/AuthForm";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { ResetPasswordFormSchemaSecondStep } from "@/services/schemas";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import SuccessBoundary from "@/components/SuccessBoundary";
import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";
import useResetPasswordToken from "@/hooks/useResetPasswordToken";
import { Check, ShieldAlert } from "lucide-react";
import routes from "@/services/routes";
import Alert from "@/components/Alert";

interface ResetPasswordTokenLayoutProps {
  token: string;
}

export default function ResetPasswordTokenLayout({
  token,
}: ResetPasswordTokenLayoutProps) {
  const translate = useTranslations("reset.password#token");
  const translateError = useTranslations("messages.error");
  const translateSuccess = useTranslations("messages.success");

  const { isError, error, isSuccess, isPending, mutate } =
    useResetPasswordToken(token);

  return (
    <AuthLayoutStyle>
      <Header
        content={translate("title")}
        caption={translate("titleCaption")}
      />
      {isError && <Alert type="error" className="lg:w-1/3">
        {translateError(error?.message || "An error occurred")}
      </Alert>}

      <SuccessBoundary
        isSuccess={isSuccess}
        message={translateSuccess("RESET_PASSWORD_SUCCESS")}
      />
      {isPending && (
        <div className="flex gap-2">
          <Spinner /> {translate("pending")}
        </div>
      )}
      <AuthForm
        schema={ResetPasswordFormSchemaSecondStep}
        formSubmitted={isPending}
        callbackFn={mutate}
        fields={[
          {
            name: "newPassword",
            type: "password",
            placeholder: translate("passwordPlaceholder"),
          },
        ]}
        submitBtnText={translate("submitBtnText")}
      />
    </AuthLayoutStyle>
  );
}
