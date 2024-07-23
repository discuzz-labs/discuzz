"use client";

import React, { useState } from "react";
import Alert from "@/components/Alert";
import { SignInFormSchema } from "@/validations/form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import routes from "@/services/routes";
import { Separator } from "@/components/ui/separator";
import OAuthGithub from "@/components/OAuth/OAuthGithub";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import Header from "@/components/Header";

interface SignInLayoutProps {
  errorParam: string | undefined;
}

export default function SignInLayout({ errorParam }: SignInLayoutProps) {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const login = async (values: z.infer<typeof SignInFormSchema>) => {
    setFormSubmitted(true);
    try {
      const signInRequest = await signIn("login", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (!signInRequest?.ok) {
        setError(signInRequest?.error as string);
      } else {
        router.push(routes.redirects.onAfterSignIn);
      }
    } catch (e) {
      setError(e as string);
    }
    setFormSubmitted(false);
  };

  return (
    <>
      <div className="w-full h-[100vh] flex">
        <div className="lg:flex lg:w-1/2 hidden decorator text-white py-10  gap-5 flex-col p-10 justify-end">
          <p className="font-extrabold text-2xl">
            “Life is like riding a bicycle. To keep your balance, you must keep
            moving.”
          </p>
          <p className="font-thin text-xl">- Albert Einstein</p>
        </div>
        <div className="lg:w-1/2 relative lg:dark:bg-black lg:dark:bg-none dark:decorator w-full flex flex-col items-center justify-center">
          {error && <Alert message={error} type="error" />}
          <Header content="Sign In." caption="Sign in to your account." />
          <OAuthGithub
            formSubmitted={formSubmitted}
            setError={setError}
            setFormSubmitted={setFormSubmitted}
            errorParam={errorParam}
          />
          <Separator className="w-1/2 my-2" />
          <AuthForm
            schema={SignInFormSchema}
            formSubmitted={formSubmitted}
            callbackFn={login}
            fields={[
              {
                name: "email",
                type: "email",
                placeholder: "Email",
              },
              {
                name: "password",
                type: "password",
                placeholder: "Password",
              },
            ]}
            submitBtnText="Sign In"
          />
          <Link className="font-thin text-xs" href="/recover/password">
            Forget Password!
          </Link>
        </div>
      </div>
    </>
  );
}
