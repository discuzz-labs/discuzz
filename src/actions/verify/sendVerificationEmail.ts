"use server";

import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import endpoints from "@/services/endpoints";
import sendEmail from "@/services/sendEmail";
import type { ACTIONResponse, APIResponse } from "@/types/api";
import ConfirmEmailTemplate, { subject } from "@/email/confirmemail.email";

interface sendVerificationEmailProps {
  email: string;
}

async function sendVerificationEmail({
  email,
}: sendVerificationEmailProps): Promise<ACTIONResponse<undefined>> {
  try {
    const generateOTPRequest = await fetch(endpoints.otp.create.path, {
      method: endpoints.otp.create.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const generateOTPResponse: APIResponse<string> =
      await generateOTPRequest.json();

    if (
      generateOTPResponse.success === false &&
      generateOTPResponse.data !== ""
    ) {
      return {
        error: ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_CREATED,
        success: false,
        data: undefined,
      };
    }

    await sendEmail({
      email,
      emailTemplate: ConfirmEmailTemplate({ otp: generateOTPResponse.data }),
      subject: subject,
    }).catch(() => {
      return {
        error: ERROR.VERIFICATION_FAILED_CONFIRM_EMAIL_CANNOT_BE_SEND,
        success: false,
        data: undefined,
      };
    });

    return {
      error: null,
      success: true,
      data: undefined,
    };
  } catch (err) {
    log("actions", err, "ACTIONS verify/sendVerificationEmail");
    return { error: ERROR.API_IS_UNREACHABLE, success: false, data: undefined };
  }
}

export default sendVerificationEmail;
