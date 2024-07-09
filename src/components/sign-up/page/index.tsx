"use client";

import { z } from "zod";
import { SignUpFormSchema } from "@/lib/validations/validation";
import { useState } from "react";
import signUpWithCred from "@/actions/sign-up/signUpWithCred";
import Link from "next/link";
import {
  UserSessionInterface,
  useUserSession,
} from "@/components/providers/AuthProvider";
import SignUpForm from "../form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { setUserSession } = useUserSession();
  const { toast } = useToast();
  const [profileImageProvidedByGravater, setprofileImageProvidedByGravater] =
    useState<string>("https://www.gravatar.com/avatar/placeholder");

  const register = async (values: z.infer<typeof SignUpFormSchema>) => {
    setFormSubmitted(true);
    try {
      const registerUser = await signUpWithCred({
        email: values.email,
        password: values.password,
        fullName: values.fullname,
        imageURL: profileImageProvidedByGravater as string,
      });
      if (registerUser.success == true) {
        setUserSession(registerUser.data as UserSessionInterface);
        router.push("/verify");
      } else {
        toast({
          title: "Cannot create you account!",
          description: registerUser.error,
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Cannot create you account!",
        description: e as string,
        variant: "destructive",
      });
    }
    setFormSubmitted(false);
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className="lg:flex lg:w-1/2 hidden bg-[#0b0a09] decorator text-white py-10  gap-5 flex-col p-10 justify-end">
        <p className="font-extrabold text-2xl">
          “Life is like riding a bicycle. To keep your balance, you must keep
          moving.”
        </p>
        <p className="font-thin text-xl">- Albert Einstein</p>
      </div>

      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center pb-10">
          <p className="text-2xl font-extrabold">Create an account</p>
          <p className="text-sm font-thin">
            Fill the form below to create an account.
          </p>
        </div>

        <SignUpForm
          profileImageProvidedByGravater={profileImageProvidedByGravater}
          formSubmitted={formSubmitted}
          setprofileImageProvidedByGravater={setprofileImageProvidedByGravater}
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
  );
}
