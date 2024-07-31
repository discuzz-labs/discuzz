"use client";

import Alert from "@/components/Alert";
import { SignInFormSchema } from "@/services/schemas";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import routes, { signInRoute } from "@/services/routes";
import { Separator } from "@/components/ui/separator";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import Header from "@/components/Header";
import { useMutation } from "@tanstack/react-query";
import OAuthProviders from "@/OAuthProviders/OAuthProviders";
import OAuthButton from "@/OAuthProviders/OAuthButton";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from 'next-intl';

interface SignInLayoutProps {
  errorParam: string | undefined;
}

export default function SignInLayout({ errorParam }: SignInLayoutProps) {
  const t = useTranslations(signInRoute);
  const e = useTranslations("error");

  const router = useRouter();

  const login = async (values: z.infer<ReturnType<typeof SignInFormSchema>>): Promise<boolean> => {
    const signInRequest = await signIn("login", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (!signInRequest?.ok) {
      throw new Error(signInRequest?.error as string);
    }
    return true;
  };

  const { isError, error, isPending, mutate } = useMutation<boolean, Error, z.infer<ReturnType<typeof SignInFormSchema>>>({
    mutationFn: login,
    onSuccess: () => {
      router.push(routes.redirects.onAfterSignIn);
    },
  });

  return (
    <AuthLayoutStyle>
      {isError && <Alert message={e(error.message)} type="error" />}
      {errorParam && <Alert message={errorParam} type="error" />}
      <Header content={t("title")} caption={t("titleCaption")} />
      {OAuthProviders.map((OAuthProvider) => (
        <OAuthButton
          key={OAuthProvider.name}
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
            placeholder: t("emailPlaceholder"),
          },
          {
            name: "password",
            type: "password",
            placeholder: t("passwordPlaceholder"),
          },
        ]}
        submitBtnText={t("submitBtnText")}
      />
      <Link className="font-thin text-xs" href="/recover/password">
        {t("forgetPasswordText")}!
      </Link>
    </AuthLayoutStyle>
  );
}
