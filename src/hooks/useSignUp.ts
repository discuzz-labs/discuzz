"use client"

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import routes from "@/services/routes";
import { z } from "zod";
import { SignUpFormSchema } from "@/services/schemas";

const useSignUp = () => {
  const router = useRouter();

  const register = async (
    values: z.infer<ReturnType<typeof SignUpFormSchema>>
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

  const { isError, error, isPending, mutate } = useMutation<boolean, Error, z.infer<ReturbType<typeof SignUpFormSchema>>>({
    mutationFn: register,
    onSuccess: () => {
      router.push(routes.redirects.onAfterSignUp);
    },
  });

  return { isError, error, isPending, mutate };
};

export default useSignUp;
