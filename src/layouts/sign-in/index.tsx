"use client";

import config from "@/config"
import { useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import OAuthButton from "@/OAuthProviders/OAuthButton";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import useSignIn from "@/hooks/useSignIn";
import { SignInFormSchema } from "@/services/schemas";

interface SignInLayoutProps {
  errorParam?: string;
}

const SignInLayout = ({ errorParam }: SignInLayoutProps) => {
  const translate = useTranslations("signin");
  const translateError = useTranslations("messages.error");

  const { isError, error, isPending, mutate } = useSignIn();
  
  return (
    <AuthLayoutStyle>
      {(isError || errorParam) && (
        <Alert
          message={translateError(isError ? error?.message : errorParam!)}
          type="error"
        />
      )}
      <Header content={translate("title")} caption={translate("titleCaption")} />
      {config.OAuthProviders.map((OAuthProvider) => (
        <OAuthButton
          key={OAuthProvider.name}
          providerDisplayName={OAuthProvider.displayName}
          name={OAuthProvider.name}
          logo={OAuthProvider.logo}
        />
      ))}
      <Separator className="w-1/2 my-2" />
      <AuthForm
        schema={SignInFormSchema}
        formSubmitted={isPending}
        callbackFn={mutate}
        fields={[
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
      <Link className="font-thin text-xs" href="/recover/password">
        {translate("forgetPasswordText")}!
      </Link>
    </AuthLayoutStyle>
  );
};

export default SignInLayout;
