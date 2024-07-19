"use client";

import { getSession, getCsrfToken } from "next-auth/react";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Check, Verified, X } from "lucide-react";
import { useEffect, useState } from "react";
import sendVerificationEmail from "@/actions/verify/sendVerificationEmail";
import { SUCCESS } from "@/lib/messages";
import verifyUser from "@/actions/verify/verifyUser";
import { useSession } from "next-auth/react";

export default function VerifyEmailPage() {
  const { data: userSession, update } = useSession();
  const [error, setError] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [verificationState, setVerificationState] = useState<
    "" | "pending" | "success" | "failed" | "verifying" | "verified"
  >("");

  const sendEmail = async () => {
    try {
      const sendVerificationEmailAction = await sendVerificationEmail({
        email: userSession?.user.email as string,
      });
      if (sendVerificationEmailAction.success == false) {
        setVerificationState("failed");
        setError(sendVerificationEmailAction.error);
      } else {
        setVerificationState("success");
      }
    } catch (err) {
      setVerificationState("failed");
      setError(err as string);
    }
  };

  const verify = async () => {
    // try {
    //   const verifyUserAction = await verifyUser({
    //     email: userSession?.user.email as string,
    //     otp,
    //   });
    //   if (verifyUserAction.success == false) {
    //     setVerificationState("failed");
    //     setError(verifyUserAction.error);
    //   } else {
    //     setVerificationState("verified");
    //     await update({verified: true})
    //   }
    // } catch (err) {
    //   setVerificationState("failed");
    //   setError(err as string);
    // }

    const csrfToken = await getCsrfToken();
    await getSession({
      req: {
        body: {
          csrfToken,
          data: { user: { verified: true } },
        },
      },
    });
  };

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col items-center justify-center dark:decorator">
        <p className="font-extrabold text-xl">Verify your email.</p>
        <p className="flex items-center gap-2">
          {verificationState == "success" && (
            <>
              <Check /> {SUCCESS.VERIFICATION_SUCCESS_CONFIRMATION_EMAIL_SEND}
            </>
          )}
          {verificationState == "verified" && (
            <>
              {userSession?.user.verified}
              <Verified /> {SUCCESS.VERIFICATION_SUCCESS_VERIFIED}
            </>
          )}
          {(verificationState == "pending" ||
            verificationState == "verifying") && (
            <>
              <Spinner />{" "}
              {verificationState == "verifying"
                ? "Verifying OTP."
                : "Sending verification email."}
            </>
          )}
          {verificationState == "failed" && (
            <>
              <X /> {error}
            </>
          )}
        </p>
        <div className="flex flex-col gap-2  mt-10 items-start">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOTP(value);
            }}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            className="w-full"
            onClick={() => {
              setVerificationState("verifying");
              verify();
            }}
          >
            Verify email.
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              setVerificationState("pending");
              sendEmail();
            }}
          >
            Send verification email.
          </Button>
        </div>
      </div>
    </>
  );
}
