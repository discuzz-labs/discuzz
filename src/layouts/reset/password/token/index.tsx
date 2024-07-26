"use client";

import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import verifyToken from "@/actions/verifyToken";
import routes, { resetPasswordTokenRoute } from "@/services/routes";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordFormSchemaSecondStep } from "@/validations/form";
import { z } from "zod";
import AuthForm from "@/components/AuthForm";
import resetPassword from "@/actions/reset/password/resetPassword";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";

interface ResetPasswordTokenLayoutProps {
  token: string;
}

export default function ResetPasswordTokenLayout({
  token,
}: ResetPasswordTokenLayoutProps) {
  const t = useTranslations(resetPasswordTokenRoute)
  const e = useTranslations("error")

  const router = useRouter();

  const resetUserPassword = async (
    values: z.infer<typeof ResetPasswordFormSchemaSecondStep>
  ): Promise<boolean> => {
    const verifyTokenAction = await verifyToken({
      token,
    });
    if (verifyTokenAction.success === false || !verifyTokenAction.data) {
      throw new Error(verifyTokenAction.error);
    }

    const resetPasswordAction = await resetPassword({
      email: verifyTokenAction.data.email,
      password: values.newPassword,
    });
    if (resetPasswordAction.success === false) {
      throw new Error(resetPasswordAction.error);
    }

    return true;
  };

  const { isError, error, isPending, mutate } = useMutation<
    boolean,
    Error,
    z.infer<typeof ResetPasswordFormSchemaSecondStep>
  >({
    mutationFn: resetUserPassword,
    onSuccess: () => {
      router.push(routes.redirects.onAfterResetPassword);
    },
  });

  return (
    <AuthLayoutStyle>
        <Header content={t("title")} caption={t("titleCaption")} />
        {isError && (
          <Alert type="error" className="lg:w-1/3">
            <ShieldAlert /> {e(error.message)}
          </Alert>
        )}
        <AuthForm
          schema={ResetPasswordFormSchemaSecondStep}
          formSubmitted={isPending}
          callbackFn={mutate}
          fields={[
            {
              name: "newPassword",
              type: "password",
              placeholder: t("passwordPlaceholder"),
            },
          ]}
          submitBtnText={t("submitBtnText")}
        />
    </AuthLayoutStyle>
  );
}
