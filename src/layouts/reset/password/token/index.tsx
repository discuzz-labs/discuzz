"use client";

import Header from "@/components/Header";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import verifyToken from "@/actions/verifyToken";
import routes, { resetPasswordTokenRoute } from "@/services/routes";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordFormSchemaSecondStep } from "@/services/schemas";
import { z } from "zod";
import AuthForm from "@/components/AuthForm";
import resetPassword from "@/actions/verify/password/resetPassword";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";

interface ResetPasswordTokenLayoutProps {
  token: string;
}

export default function ResetPasswordTokenLayout({
  token,
}: ResetPasswordTokenLayoutProps) {
  const translate = useTranslations("reset.password#token")
  const translateError = useTranslations("messages.error")

  const router = useRouter();

  const { isError, error, isPending, mutate } = useMutation<
    void,
    Error,
    z.infer<ReturnType<typeof ResetPasswordFormSchemaSecondStep>>
  >({
    mutationFn: async (values:  z.infer<ReturnType<typeof ResetPasswordFormSchemaSecondStep>>) => {
      const email = await verifyToken({
        token,
      });
      const resetPasswordAction = await resetPassword({
        email,
        password: values.newPassword,
      });
    },
    onSuccess: () => {
      router.push(routes.redirects.onAfterResetPassword);
    },
  });

  return (
    <AuthLayoutStyle>
        <Header content={translate("title")} caption={translate("titleCaption")} />
        {isError && (
          <Alert type="error" className="lg:w-1/3">
            <ShieldAlert /> {translateError(error.message)}
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
              placeholder: translate("passwordPlaceholder"),
            },
          ]}
          submitBtnText={translate("submitBtnText")}
        />
    </AuthLayoutStyle>
  );
}
