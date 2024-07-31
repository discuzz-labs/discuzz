"use client";

import { z } from "zod";
import { SignUpFormSchema } from "@/services/schemas";
import Link from "next/link";
import Alert from "@/components/Alert";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import routes, { signUpRoute } from "@/services/routes";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import { useMutation } from "@tanstack/react-query";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";
import { useTranslations } from "next-intl";

export default function SignUpLayout() {
  const t = useTranslations(signUpRoute);
  const e = useTranslations("error")

  const router = useRouter();

  const register = async (
    values: z.infer<ReturnType<typeof SignUpFormSchema>>
  ): Promise<boolean> => {
    const signUpRequest = await signIn("signup", {
      email: values.email,
      password: values.password,
      name: values.name,
      image: "https://www.gravatar.com/avatar/placeholder",
      redirect: false,
    });
    if (!signUpRequest?.ok) {
      throw new Error(signUpRequest?.error as string);
    }

    return true;
  };

  const { isError, error, isPending, mutate } = useMutation<
    boolean,
    Error,
    z.infer<ReturnType<typeof SignUpFormSchema>>
  >({
    mutationFn: register,
    onSuccess: () => {
      router.push(routes.redirects.onAfterSignUp);
    },
  });

  return (
    <AuthLayoutStyle>
      {" "}
      {isError && <Alert message={e(error.message)} type="error" />}
      <Header content={t("title")} caption={t("titleCaption")} />
      <AuthForm
        schema={SignUpFormSchema}
        formSubmitted={isPending}
        callbackFn={mutate}
        fields={[
          {
            name: "name",
            type: "text",
            placeholder: t("fullnamePlaceholder"),
          },
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
      <p className="mt-10 w-1/2 font-thin text-zinc-600 text-sm text-center">
        {t("disclaimerText")} &nbsp;
        <Link href="/terms" className="underline hover:text-white">
          {t("termsOfService")} &nbsp;
        </Link>
      </p>
    </AuthLayoutStyle>
  );
}
