// useOAuthSignIn.ts
"use client";

import { signIn, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import routes from "@/services/routes";

export function useOAuthSignIn(providerName: string) {
  const router = useRouter();
  const { data: userSession } = useSession()
  
  const loginWithOAuth = async (): Promise<boolean> => {
    const signInRequest = await signIn(providerName);
    if (!signInRequest?.ok) {
      throw new Error(signInRequest?.error as string);
    }
    return true;
  };

  const { isError, error, isPending, mutate } = useMutation<boolean, Error, void>({
    mutationFn: loginWithOAuth,
    onSuccess() {
      if (userSession) {
        router.push(`${routes.redirects.onAfterVerify}/${userSession.user.id}`);
      }
    },
  });

  return { signIn: mutate, isError, error, isPending };
}
