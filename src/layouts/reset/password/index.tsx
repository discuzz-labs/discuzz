"use client";

import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import createToken from "@/actions/createToken";
import { ResetPasswordFormSchemaFirstStep } from "@/services/schemas";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Alert from "@/components/Alert";
import sendResetPasswordEmail from "@/actions/reset/password/sendResetPasswordEmail";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";
import { resetPasswordRoute } from "@/services/routes";

export default function ResetPasswordLayout() {
  const translate = useTranslations("reset.password")
  const translateError = useTranslations("messages.error")
  const translateSuccess = useTranslations("messages.success")


  const { isError, error, isPending, isSuccess, mutate } = useMutation<
    void,
    Error,
    z.infer<ReturnType<typeof ResetPasswordFormSchemaFirstStep>>
  >({
    mutationFn: async (values: z.infer<ReturnType<typeof ResetPasswordFormSchemaFirstStep>>) => {
      const token = await createToken({
        email: values.email,
      });
      await sendResetPasswordEmail({
        email: values.email,
        userName: "user of Discuzz",
        token: token,
      });
    },
  });

  return (
    <AuthLayoutStyle>
      <Header
        content={translate("title")}
        caption={translate("titleCaption")}
      />
      {isError && <Alert message={translateError(error.message)} type="error" />}
      {isSuccess && (
        <p className="flex items-center gap-5">
          <Check /> {translateSuccess("RESETPASSWORD_SUCCESS_EMAIL_SENT")}{" "}
        </p>
      )}

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
    </AuthLayoutStyle>
  );
}
