"use client";

import React, { useState } from "react";
import SignInForm from "../form";
import Alert from "@/components/Alert";
import { SignInFormSchema } from "@/validations/validation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInPage() { 
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const login = async (values: z.infer<typeof SignInFormSchema>) => {
    setFormSubmitted(true);
    try {
      const signInRequest = await signIn("login", {
        email: values.email,
        password: values.password,
        redirect:false
      })
      if(!signInRequest?.ok) setError(signInRequest?.error as string)
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
          <Button
              disabled={formSubmitted}
              className="w-1/2 flex items-center gap-2"
              onClick={async () => { 
                const auth = await signIn("github") 
                console.log(auth)
              }}
            >
              <Github /> Github
            </Button>
          <SignInForm login={login} formSubmitted={formSubmitted} />
        </div>
      </div>
    </>
  );
}
