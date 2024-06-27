"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInFormSchema } from "@/lib/validations/validation";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { InputForm } from "@/components/InputForm";

export default function SignInForm() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit = (values: z.infer<typeof SignInFormSchema>) => {
    setFormSubmitted(true);
    toast({
      title: "Account created successfully...",
      description: `Hello in ${config.metadata.title} family`,
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
            Sign In to {config.metadata.title}
          </h1>
        </div>
        <InputForm<typeof SignInFormSchema>
          label={"Email"}
          name="email"
          form={form}
          type="email"
          placeholder="Email"
          isPending={formSubmitted}
          onChangeCapture={() => {}}
        />
        <InputForm<typeof SignInFormSchema>
          label={"Password"}
          name="password"
          form={form}
          type="password"
          placeholder="Password"
          isPending={formSubmitted}
          onChangeCapture={() => {}}
        />
        <div>
          <Link href="/forgot">Forgot Password?</Link>
        </div>
        <Button type="submit" variant="submit" disabled={formSubmitted}>
          {formSubmitted && <Spinner />}
          Continue
        </Button>
      </form>
    </Form>
  );
}
