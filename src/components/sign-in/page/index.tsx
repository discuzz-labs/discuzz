"use client";

import React, { useEffect, useState } from "react";
import SignInForm from "../form";
import Alert from "@/components/Alert";
import { SignInFormSchema } from "@/validations/validation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import routes from "@/services/routes";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      // @ts-ignore
      setProviders(res);
    })();
  }, []);

  const login = async (values: z.infer<typeof SignInFormSchema>) => {
    setFormSubmitted(true);
    try {
      const signInRequest = await signIn("login", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (!signInRequest?.ok) setError(signInRequest?.error as string);
      const callbackUrl = searchParams.get("callbackUrl");
      router.push(callbackUrl ? callbackUrl : routes.redirects.onAfterSignIn);
    } catch (e) {
      setError(e as string);
    }
    setFormSubmitted(false);
  };
  return (
    <>
      <div className="w-full h-[100vh] relative flex">
        {error && <Alert message={error} type="error" />}
        <div className="lg:flex lg:w-1/2 hidden bg-[#0b0a09] decorator text-white py-10  gap-5 flex-col p-10 justify-end">
          <p className="font-extrabold text-2xl">
            “Life is like riding a bicycle. To keep your balance, you must keep
            moving.”
          </p>
          <p className="font-thin text-xl">- Albert Einstein</p>
        </div>
        <div className="lg:w-1/2 lg:dark:bg-black lg:dark:bg-none dark:decorator w-full flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center pb-10">
            <p className="text-2xl font-extrabold">Sign in</p>
            <p className="text-sm font-thin">Sign in to your account.</p>
          </div>
          {providers &&
            Object.values(providers)
            // @ts-ignore
              .filter((provider) => provider.name !== "Credentials")
              .map((provider) => (
                // @ts-ignore
                <Button
                  // @ts-ignore
                  key={provider.name}
                  disabled={formSubmitted}
                  className="w-1/2 flex items-center gap-2"
                  onClick={async () => {
                    // @ts-ignore
                    const auth = await signIn(provider.id);
                    console.log(auth);
                  }}
                >
                  {/* @ts-ignore */}
                  <Github /> {provider.name}
                </Button>
              ))}
          <Separator className="w-1/2 my-2" />
          <SignInForm login={login} formSubmitted={formSubmitted} />
        </div>
      </div>
    </>
  );
}
