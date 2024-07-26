"use client";

import sendVerificationEmail from "@/actions/verify/sendVerificationEmail";
import { SUCCESS } from "@/services/messages";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Alert from "@/components/Alert";
import createToken from "@/actions/createToken";
import { VerifyEmailFormSchema } from "@/validations/form";
import AuthForm from "@/components/AuthForm";
import { Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";
import { verifyRoute } from "@/services/routes";

export default function VerifyLayout() {
  const t = useTranslations(verifyRoute)
  const e = useTranslations("error")
  const s = useTranslations("success")

  const { data: userSession } = useSession();

  const sendEmail = async (): Promise<boolean> => {
    const createOobAction = await createToken({
      email: userSession?.user.email as string,
    });
    if (createOobAction.success === false) {
      throw new Error(createOobAction.error);
    }

    const sendVerificationEmailAction = await sendVerificationEmail({
      email: userSession?.user.email as string,
      userName: userSession?.user.name as string,
      token: createOobAction.data?.token as string,
    });

    if (sendVerificationEmailAction.success === false) {
      throw new Error(sendVerificationEmailAction.error);
    }

    return true;
  };

  const { isError, error, isSuccess, isPending, mutate } = useMutation<
    boolean,
    Error,
    void
  >({
    mutationFn: sendEmail,
  });

  return (
    <AuthLayoutStyle>
      <Header content={t("title")} caption={t("titleCaption")} />
      {isError && <Alert message={e(error.message)} type="error" />}
      {isSuccess && (
        <p className="flex items-center gap-5">
          <Check /> {s(SUCCESS.VERIFICATION_SUCCESS_EMAIL_SENT)}{" "}
        </p>
      )}
      <AuthForm
        schema={VerifyEmailFormSchema}
        formSubmitted={isPending}
        fields={[]}
        callbackFn={() => mutate()}
        submitBtnText={t("submitBtnText")}
      />
    </AuthLayoutStyle>
  );
}
