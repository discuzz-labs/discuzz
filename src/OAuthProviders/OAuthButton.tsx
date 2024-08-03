"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ReactElement } from "react";
import { useOAuthSignIn } from "@/hooks/useOAuthSignIn"; // Custom hook for sign-in logic

interface OAuthButtonProps {
  name: string; // This can be more specific based on the OAuth provider names
  logo: string;
  providerDisplayName: string;
}

export default function OAuthButton({
  name,
  logo,
  providerDisplayName
}: OAuthButtonProps): ReactElement {
  const { signIn, isError, error, isPending } = useOAuthSignIn(name);

  const handleClick = () => {
    signIn();
  };

  return (
    <>
      <Button
        disabled={isPending}
        className="w-1/2 flex items-center gap-2"
        onClick={handleClick} // Use the wrapped function
      >
        <Image
          src={logo}
          alt={`OAuthProvider Logo - ${providerDisplayName}`}
          width={32}
          height={32}
        />
        {providerDisplayName}
      </Button>
      {isError && <p className="text-destructive">{error?.message}</p>}
    </>
  );
}
