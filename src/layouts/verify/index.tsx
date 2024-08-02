"use client";

import sendVerificationEmail from "@/actions/verify/sendVerificationEmail";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import createToken from "@/actions/createToken";
import { VerifyEmailFormSchema } from "@/services/schemas";
import AuthForm from "@/components/AuthForm";
import { Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";
import { verifyRoute } from "@/services/routes";

export default function VerifyLayout() {
  const translate = useTranslations("verify");
  const translateError = useTranslations("messages.error");
  const translateSuccess = useTranslations("messages.success");

  const { data: userSession } = useSession();

  const { isError, error, isSuccess, isPending, mutate } = useMutation<
    void,
    Error,
    void
  >({
    mutationFn: async () => {
      const token = await createToken({
        email: userSession?.user.email as string,
      });

      await sendVerificationEmail({
        email: userSession?.user.email as string,
        userName: userSession?.user.name as string,
        token,
      });
    },
  });

  return (
    <AuthLayoutStyle>
      <Header content={translate("title")} caption={translate("titleCaption")} />
      {isError && <Alert message={translateError(error.message)} type="error" />}
      {isSuccess && (
        <p className="flex items-center gap-5">
          <Check /> {translateSuccess("VERIFICATION_SUCCESS_EMAIL_SENT")}{" "}
        </p>
      )}
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
