"use client";

import { z } from "zod";
import { SignUpFormSchema } from "@/services/schemas";
import Link from "next/link";
import Alert from "@/components/Alert";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import useSignUp from "@/hooks/useSignUp";

const SignUpLayout = () => {
  const translate = useTranslations("signup");
  const translateError = useTranslations("messages.error");

  const { isError, error, isPending, mutate } = useSignUp();

  return (
    <AuthLayoutStyle>
      {isError && <Alert message={translateError(error?.message)} type="error" />}
      <Header content={translate("title")} caption={translate("titleCaption")} />
      <AuthForm
        schema={SignUpFormSchema}
        formSubmitted={isPending}
        callbackFn={mutate}
        fields={[
          {
            name: "name",
            type: "text",
            placeholder: translate("fullnamePlaceholder"),
          },
          {
            name: "email",
            type: "email",
            placeholder: translate("emailPlaceholder"),
          },
          {
            name: "password",
            type: "password",
            placeholder: translate("passwordPlaceholder"),
          },
        ]}
        submitBtnText={translate("submitBtnText")}
      />
      <p className="mt-10 w-1/2 font-thin text-zinc-600 text-sm text-center">
        {translate("disclaimerText")} &nbsp;
        <Link href="/terms" className="underline hover:text-white">
          {translate("termsOfService")} &nbsp;
        </Link>
      </p>
    </AuthLayoutStyle>
  );
};

export default SignUpLayout;
