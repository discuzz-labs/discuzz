"use client";

import { z } from "zod";
import { SignUpFormSchema } from "@/validations/form";
import Link from "next/link";
import Alert from "@/components/Alert";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import routes from "@/services/routes";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import { useMutation } from "@tanstack/react-query";
import AuthLayoutStyle from "@/styles/AuthLayoutStyle";

export default function SignUpLayout() {
  const router = useRouter();

  const register = async (
    values: z.infer<typeof SignUpFormSchema>
  ): Promise<boolean> => {
    const signUpRequest = await signIn("signup", {
      email: values.email,
      password: values.password,
      name: values.name,
      image: "https://www.gravatar.com/avatar/placeholder",
      redirect: false,
    });
    if (!signUpRequest?.ok) {
      throw new Error(signUpRequest?.error as string);
    }

    return true;
  };

  const { isError, error, isPending, mutate } = useMutation<
    boolean,
    Error,
    z.infer<typeof SignUpFormSchema>
  >({
    mutationFn: register,
    onSuccess: () => {
      router.push(routes.redirects.onAfterSignUp);
    },
  });

  return (
    <AuthLayoutStyle>
      {" "}
      {isError && <Alert message={error.message} type="error" />}
      <Header content="Sign Up." caption="Create a new account." />
      <AuthForm
        schema={SignUpFormSchema}
        formSubmitted={isPending}
        callbackFn={mutate}
        fields={[
          {
            name: "email",
            type: "email",
            placeholder: "Email - use grevater email!",
          },
          {
            name: "name",
            type: "text",
            placeholder: "Fullname",
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
          },
        ]}
        submitBtnText="Create an account"
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
    </AuthLayoutStyle>
  );
}
