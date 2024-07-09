"use client";

import { useUserSession } from "@/components/providers/AuthProvider";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Check, X } from "lucide-react";

export default function VerifyEmailPage() {
  const { userSession } = useUserSession();
  console.log(userSession);

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center dark:decorator">
      <p className="font-extrabold text-xl">Verify your email.</p>
      <p className="flex items-center gap-2">
        {/* <Check /> Verfication email was sent. */}
        {/* <Spinner /> Sending verification email. */}
        {/* <X /> Cannot send verification email. */}
        {/* <X /> Cannot verify your email. */}
      </p>
      <div className="flex flex-col gap-2  mt-10 items-start">
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button className="w-full">Verify email.</Button>
        <Button variant={"link"}>Resend verification email?</Button>
      </div>
    </div>
  );
}
