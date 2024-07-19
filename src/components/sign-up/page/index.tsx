"use client";

import { z } from "zod";
import { SignUpFormSchema } from "@/validations/validation";
import { useState } from "react";
import Link from "next/link";
import SignUpForm from "../form";
import Alert from "@/components/Alert";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import routes from "@/services/routes";

export default function SignUpPage() {
  const router = useRouter()
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [profileImageProvidedByGravater, setprofileImageProvidedByGravater] =
    useState<string>("https://www.gravatar.com/avatar/placeholder");

  const register = async (values: z.infer<typeof SignUpFormSchema>) => {
    setFormSubmitted(true);
    try {
      const signUpRequest = await signIn("signup", {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        imageURL: profileImageProvidedByGravater,
        redirect:false
      })
      if(!signUpRequest?.ok) setError(signUpRequest?.error as string)
      router.push(routes.redirects.onAfterSignUp)
    } catch (e) {
      setError(e as string);
    }
    setFormSubmitted(false);
  };

  return (
    <>
      <div className="w-full relative min-h-[100vh] flex">
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
            <p className="text-2xl font-extrabold">Create an account</p>
            <p className="text-sm font-thin">
              Fill the form below to create an account.
            </p>
          </div>
          <SignUpForm
            profileImageProvidedByGravater={profileImageProvidedByGravater}
            formSubmitted={formSubmitted}
            setprofileImageProvidedByGravater={
              setprofileImageProvidedByGravater
            }
            register={register}
          />

          <p className="mt-10 w-1/2 font-thin text-zinc-600 text-sm text-center">
            By clicking continue, you agree to our &nbsp;
            <Link href="/terms" className="underline hover:text-white">
              Terms of Service &nbsp;
            </Link>
            and &nbsp;
            <Link href="/privacy" className="underline hover:text-white">
              Privacy Policy.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
