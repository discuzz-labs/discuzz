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
    <>
      <div className="w-full relative min-h-[100vh] flex">
        <div className="lg:flex lg:w-1/2 hidden decorator text-white py-10  gap-5 flex-col p-10 justify-end">
          <p className="font-extrabold text-2xl">
            “Life is like riding a bicycle. To keep your balance, you must keep
            moving.”
          </p>
          <p className="font-thin text-xl">- Albert Einstein</p>
        </div>

        <div className="lg:w-1/2 lg:dark:bg-black lg:dark:bg-none dark:decorator w-full flex flex-col items-center justify-center">
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
        </div>
      </div>
    </>
  );
}
