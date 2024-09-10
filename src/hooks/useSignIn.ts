"use client"

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import routes from "@/services/routes";
import { z } from "zod";
import { SignInFormSchema } from "@/services/schemas";

const useSignIn = () => {
  const router = useRouter();

  const login = async (values: z.infer<ReturnType<typeof SignInFormSchema>>): Promise<boolean> => {
    const signInRequest = await signIn("login", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
  
    if (!signInRequest?.ok) {
      throw new Error(signInRequest?.error as string);
    }
    
    return true;
  };

  const { isError, error, isPending, mutate } = useMutation<boolean, Error, z.infer<ReturnType<typeof SignInFormSchema>>> ({
    mutationFn: login,
    onSuccess: () => {
      router.push(routes.redirects.onAfterSignIn);
    },
  });
  
  return { isError, error, isPending, mutate };
};

export default useSignIn;
