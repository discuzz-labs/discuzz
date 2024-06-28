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
import { useToast } from "@/components/ui/use-toast";
import { SHA256 } from "crypto-js";
import { InputForm } from "@/components/InputForm";
import { ERROR, SUCCESS } from "@/lib/messages";
import { User } from "@/types/database";

export default function SignUpForm() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  const [profileImageProvidedByGravater, setprofileImageProvidedByGravater] =
    useState<string | undefined>(undefined);
  const { toast } = useToast();
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

  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    setFormSubmitted(true);
    // check if user has the email before
    try {
      const apiRequest = await fetch("/api/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });
      const data = await apiRequest.json();
      if (data) setError(ERROR.REGISTERATION_FAILED_EMAIL_ALREADY_EXSITS);
    } catch (err) {
      setError(ERROR.API_IS_UNREACHABLE);
      return;
    }

    toast({
      title: SUCCESS.REGISTERATION_SUCCESS_CONFIRMATION_EMAIL_SEND,
      variant: "success",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
            <p>There was an error creating your account!</p>
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
        <InputForm<typeof SignUpFormSchema>
          label={"Fullname"}
          name="fullname"
          form={form}
          type="text"
          placeholder="Fullname"
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
