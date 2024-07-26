"use client";

import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import createToken from "@/actions/createToken";
import { ResetPasswordFormSchemaFirstStep } from "@/validations/form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { SUCCESS } from "@/services/messages";
import Alert from "@/components/Alert";
import sendResetPasswordEmail from "@/actions/reset/password/sendResetPasswordEmail";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";
import { resetPasswordRoute } from "@/services/routes";

export default function ResetPasswordLayout() {
  const t = useTranslations(resetPasswordRoute)
  const e = useTranslations("error")
  const s = useTranslations("success")
  
  const sendEmail = async (
    values: z.infer<typeof ResetPasswordFormSchemaFirstStep>
  ): Promise<boolean> => {
    const createOobAction = await createToken({
      email: values.email,
    });
    if (createOobAction.success === false) {
      throw new Error(createOobAction.error);
    }

    const sendResetPasswordEmailAction = await sendResetPasswordEmail({
      email: values.email,
      userName: "user of Discuzz",
      token: createOobAction.data?.token as string,
    });

    if (sendResetPasswordEmailAction.success === false) {
      throw new Error(sendResetPasswordEmailAction.error);
    }

    return true;
  };

  const { isError, error, isPending, isSuccess, mutate } = useMutation<
    boolean,
    Error,
    z.infer<typeof ResetPasswordFormSchemaFirstStep>
  >({
    mutationFn: sendEmail,
  });

  return (
    <AuthLayoutStyle>
      <Header
        content={t("title")}
        caption={t("titleCaption")}
      />
      {isError && <Alert message={e(error.message)} type="error" />}
      {isSuccess && (
        <p className="flex items-center gap-5">
          <Check /> {s(SUCCESS.RESETPASSWORD_SUCCESS_EMAIL_SENT)}{" "}
        </p>
      )}

      <AuthForm
        schema={ResetPasswordFormSchemaFirstStep}
        formSubmitted={isPending}
        callbackFn={mutate}
        fields={[
          {
            name: "email",
            placeholder: t("emailPlaceholder"),
            type: "email",
          },
        ]}
        submitBtnText={t("submitBtnText")}
      />
    </AuthLayoutStyle>
  );
}
