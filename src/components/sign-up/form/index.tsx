"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFormSchema } from "@/lib/validations/validation";
import config from "@/lib/config";
import ProfileImage from "@/components/ProfileImage";
import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { SHA256 } from "crypto-js";
import { InputForm } from "@/components/InputForm";
import { redirect } from "next/navigation";
import signUpWithCred from "@/actions/sign-up/signUpWithCred";
import Link from "next/link";
import {
  UserSessionInterface,
  useUserSession,
} from "@/components/providers/AuthProvider";
import { Separator } from "@/components/ui/separator";

export default function SignUpForm() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { setUserSession } = useUserSession();
  const [error, setError] = useState<any>("");
  const [profileImageProvidedByGravater, setprofileImageProvidedByGravater] =
    useState<string>("https://www.gravatar.com/avatar/placeholder");
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(SignUpFormSchema),
  });

  const getprofileImageProvidedByGravater = (email: string | undefined) => {
    if (email == undefined) return;
    let hashedGravaterEmail = SHA256(email);
    setprofileImageProvidedByGravater(
      `https://www.gravatar.com/avatar/${hashedGravaterEmail}`
    );
  };

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
      } else {
        setError(registerUser.error);
      }
    } catch (e) {
      setError(e);
    }
    setFormSubmitted(false);
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-1/2 bg-[#0b0a09] decorator text-white py-10 flex gap-5 flex-col p-10 justify-end">
        <p className="font-extrabold text-2xl">
          “Life is like riding a bicycle. To keep your balance, you must keep
          moving.”
        </p>
        <p className="font-thin text-xl">- Albert Einstein</p>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center pb-10">
          <p className="text-2xl font-extrabold">Create an account</p>
          <p className="text-sm font-thin">
            Fill the form below to create an account.
          </p>
        </div>

        <ProfileImage
          img={profileImageProvidedByGravater}
          size={25}
          className="flex items-center justify-center w-full mb-5"
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(register)}
            className={cn(
              "w-full flex flex-col items-center justify-center gap-5"
            )}
          >
            <InputForm<typeof SignUpFormSchema>
              form={form}
              name={"fullname"}
              className="w-1/2"
              onChangeCapture={() => {}}
              type={"text"}
              isPending={formSubmitted}
              placeholder="Fullname"
            />
            <InputForm<typeof SignUpFormSchema>
              form={form}
              name={"email"}
              className="w-1/2"
              onChangeCapture={getprofileImageProvidedByGravater}
              type={"email"}
              isPending={formSubmitted}
              placeholder="Email - use gravater email"
            />
            <InputForm<typeof SignUpFormSchema>
              form={form}
              name={"password"}
              className="w-1/2"
              onChangeCapture={() => {}}
              type={"password"}
              isPending={formSubmitted}
              placeholder="Password"
            />
          </form>
        </Form>

        <div className="w-full flex items-center flex-col gap-5 mt-5">
          <Button disabled={formSubmitted} className="w-1/2">
            Create an account.
          </Button>

          <Link className="font-thin text-xs" href="/recover/password">
            Forget Password!
          </Link>
        </div>

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
