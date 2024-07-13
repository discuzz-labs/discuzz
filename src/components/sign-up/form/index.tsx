"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFormSchema } from "@/validations/validation";
import ProfileImage from "@/components/ProfileImage";
import { SHA256 } from "crypto-js";
import { InputForm } from "@/components/InputForm";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

interface SignUpFormProps {
  profileImageProvidedByGravater: string;
  setprofileImageProvidedByGravater: (image: string) => void;
  formSubmitted: boolean;
  register: (values: z.infer<typeof SignUpFormSchema>) => void;
}

export default function SignUpForm({
  profileImageProvidedByGravater,
  setprofileImageProvidedByGravater,
  formSubmitted,
  register,
}: SignUpFormProps) {
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

  return (
    <>
      <ProfileImage
        img={profileImageProvidedByGravater}
        size={25}
        className="flex items-center justify-center w-full mb-5"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(register)}
          className="w-full flex flex-col items-center justify-center gap-5"
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

          <div className="w-full flex items-center flex-col gap-5 mt-5">
            <Button
              disabled={formSubmitted}
              className="w-1/2 flex items-center gap-2"
            >
              {formSubmitted && <Spinner />} Create an account.
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
