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
import { useState } from "react";
import sendVerificationEmail from "@/actions/verify/sendVerificationEmail"; 
import createOtp from "@/actions/verify/createOtp"; 
import verifyOtp from "@/actions/verify/verifyOtp"; 
import { SUCCESS } from "@/lib/messages";
import verifyUser from "@/actions/verify/verifyUser";
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation"
import routes from "@/services/routes";

export default function VerifyLayout() {
  const router = useRouter()
  const { data: userSession } = useSession();
  const [error, setError] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [verificationStatus, setVerificationStatus] = useState<
    | ""
    | "emailSending"
    | "emailSentSuccess"
    | "emailSentFailed"
    | "otpVerifying"
    | "otpVerifiedSuccess"
    | "otpVerifiedFailed"
  >("");

  const sendEmail = async () => {
    try {
      console.log(userSession?.user)
      const createOTP = await createOtp({ id: userSession?.user.id as string })
      if (createOTP.success == false) {
        setVerificationStatus("emailSentFailed");
        setError(createOTP.error);
        return;
      }

      const sendVerificationEmailAction = await sendVerificationEmail({
        email: userSession?.user.email as string,
        userName: userSession?.user.name as string,
        otp: createOTP.data?.otp as string
      });
      if (sendVerificationEmailAction.success == false) {
        setVerificationStatus("emailSentFailed");
        setError(sendVerificationEmailAction.error);
      } else {
        setVerificationStatus("emailSentSuccess");
      }
    } catch (err) {
      setVerificationStatus("emailSentFailed");
      setError(err as string);
    }
  };

  const verify = async () => {
    try {
      const verifyOTP = await verifyOtp({ id: userSession?.user.id as string, otp })
      if (verifyOTP.success == false) {
        setVerificationStatus("otpVerifiedFailed");
        setError(verifyOTP.error);
        return
      }

      const verifyUserAction = await verifyUser({
        id: userSession?.user.id as string,
      });
      
      if (verifyUserAction.success == false) {
        setVerificationStatus("otpVerifiedFailed");
        setOTP("")
        setError(verifyUserAction.error);
      } else {
        setVerificationStatus("otpVerifiedSuccess");
        const csrfToken = await getCsrfToken();
        await getSession({
          req: {
            body: {
              csrfToken,
              data: { user: { verified: true } },
            },
          },
        });
        router.push(routes.redirects.onAfterVerify)
      }
    } catch (err) {
      setVerificationStatus("otpVerifiedFailed");
      setOTP("")
      setError(err as string);
    }

  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center dark:decorator">
      <p className="font-extrabold text-xl">Verify your email.</p>
      <p className="flex items-center gap-2">
        {verificationStatus === "emailSentSuccess" && (
          <>
            <Check /> {SUCCESS.VERIFICATION_SUCCESS_EMAIL_SENT}
          </>
        )}
        {verificationStatus === "otpVerifiedSuccess" && (
          <>
            {userSession?.user.verified}
            <Verified /> {SUCCESS.VERIFICATION_SUCCESS_VERIFIED}
          </>
        )}
        {(verificationStatus === "emailSending" ||
          verificationStatus === "otpVerifying") && (
          <>
            <Spinner />{" "}
            {verificationStatus === "otpVerifying"
              ? "Verifying OTP."
              : "Sending verification email."}
          </>
        )}
        {(verificationStatus === "emailSentFailed" ||
          verificationStatus === "otpVerifiedFailed") && (
          <>
            <X /> {error}
          </>
        )}
      </p>
      <div className="flex flex-col gap-2 mt-10 items-start">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOTP(value)}
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
            if (verificationStatus === "emailSentSuccess") {
              setVerificationStatus("otpVerifying");
              verify();
            } else {
              setVerificationStatus("emailSending");
              sendEmail();
            }
          }}
        >
          {verificationStatus === "emailSentSuccess"
            ? "Verify"
            : "Send Verification Email"}
        </Button>
      </div>
    </div>
  );
}
