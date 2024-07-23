"use client"

import routes from "@/services/routes";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { useEffect } from "react";
import { ERROR } from "@/lib/messages";

interface OAuthGithubProps {
  formSubmitted: boolean;
  setFormSubmitted: (state: boolean) => void;
  setError: (state: string) => void;
  errorParam: string | undefined;
}

export default function OAuthGithub({
  formSubmitted,
  setFormSubmitted,
  setError,
  errorParam
}: OAuthGithubProps) {
  useEffect(() => {
    errorParam ? setError(`${ERROR.CALLBACK_ERROR} due to ${errorParam}.`) : ""
  }, [errorParam])

  const loginWithGithub = async () => {
    setFormSubmitted(true);
    try {
      await signIn("github", {
        callbackUrl: routes.redirects.onAfterVerify,
      });
    } catch (e) {
      setError(e as string);
    }
    setFormSubmitted(false);
  };

  return (
    <Button
      disabled={formSubmitted}
      className="w-1/2 flex items-center gap-2"
      onClick={loginWithGithub}
    >
      <Github /> Github
    </Button>
  );
}
