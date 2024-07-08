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
import {
  UserSessionInterface,
  useUserSession,
} from "@/components/providers/AuthProvider";

export default function SignUpForm() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { setUserSession } = useUserSession();
  const [error, setError] = useState<any>(undefined);
  const [profileImageProvidedByGravater, setprofileImageProvidedByGravater] =
    useState<string | undefined>("https://www.gravatar.com/avatar/placeholder");
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
        imageURL: values.profile_photo as string,
      });
      if (registerUser.success == true) {
        setUserSession(registerUser.data as UserSessionInterface);
      } else {
        setError(registerUser.error);
      }
    } catch (e) {
      setFormSubmitted(false);
      setError(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(register)}
        className={cn(
          "dark:bg-[#212126] shadow-md flex flex-col gap-4 p-10 rounded-md",
          "sm:w-full md:w-1/2 lg:w-1/3 w-full"
        )}
      >
        <div className="w-full items-center justify-center">
          <h1 className="text-2xl font-extrabold">
            Welcome to {config.metadata.title}
          </h1>
          <p className="font-thin">Tell us a little bit about yourself.</p>
        </div>
        {error && (
          <div className="p-5 m-2 flex items-center justify-center bg-destructive text-destructive-foreground font-semibold rounded-md ">
            <p>{error}</p>
          </div>
        )}
        <ProfileImage img={profileImageProvidedByGravater} />
        <InputForm<typeof SignUpFormSchema>
          label={"Gravater Email"}
          name="profile_photo"
          form={form}
          type="email"
          placeholder="Gravater Email"
          isPending={formSubmitted}
          onChangeCapture={getprofileImageProvidedByGravater}
        />
        <InputForm<typeof SignUpFormSchema>
          label={"Fullname"}
          name="fullname"
          form={form}
          type="text"
          placeholder="Fullname"
          isPending={formSubmitted}
          onChangeCapture={() => {}}
        />

        <InputForm<typeof SignUpFormSchema>
          label={"Email"}
          name="email"
          form={form}
          type="email"
          placeholder="Email"
          isPending={formSubmitted}
          onChangeCapture={() => {}}
        />
        <InputForm<typeof SignUpFormSchema>
          label={"Password"}
          name="password"
          form={form}
          type="password"
          placeholder="Password"
          isPending={formSubmitted}
          onChangeCapture={() => {}}
        />

        <Button type="submit" variant="submit" disabled={formSubmitted}>
          {formSubmitted && <Spinner />}
          Continue
        </Button>
      </form>
    </Form>
  );
}
