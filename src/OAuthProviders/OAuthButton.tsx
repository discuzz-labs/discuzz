"use client";

import routes from "@/services/routes";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import Image from 'next/image';
import { ProviderName } from "./OAuthProviders";
import { ReactElement } from "react";
import { useRouter } from "next/navigation";

interface OAuthButtonProps{
  name: ProviderName,
  logo: string
}

export default function OAuthButton({
  name,
  logo,
} : OAuthButtonProps) : ReactElement {
  const { data: userSession } = useSession()
  const router = useRouter()
  
  const loginWithGithub = async (): Promise<boolean> => {
    const signInRequestWithOAuth = await signIn(name)
    if (!signInRequestWithOAuth?.ok) {
      throw new Error(signInRequestWithOAuth?.error as string);
    }
    return true;
  };

  const { isError, error, isPending, mutate } = useMutation<
    boolean,
    Error,
    void
  >({
    mutationFn: loginWithGithub,
    onSuccess() {
      if(userSession) router.push(`${routes.redirects.onAfterVerify}/${userSession.user.id}`)
    },
  });

  return (
    <>
      <Button
        disabled={isPending}
        className="w-1/2 flex items-center gap-2"
        onClick={() => mutate()}
      >
        <Image 
          src={logo}
          alt={`OAuthProvider Logo - ${name}}`}
          width={32}
          height={32}
        />
        Github
      </Button>
      {isError && <p className="text-destructive">{error.message}</p>}
    </>
  );
}
