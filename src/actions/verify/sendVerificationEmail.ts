"use server";

import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import type { OtpCreatePayload, OtpCreateResponse } from "@/services/endpoints";
import endpoints from "@/services/endpoints";
import sendEmail from "@/services/sendEmail";
import type { ACTIONResponse } from "@/types/api";
import VerificationEmailTemplate, { subject } from "@/emailTemplate/Verificationemail.email";
import sendRequest from "@/lib/sendRequest";

interface sendVerificationEmailProps {
  email: string;
  userName: string;
}

async function sendVerificationEmail({
  email,
  userName
}: sendVerificationEmailProps): Promise<ACTIONResponse<undefined>> {
  try {
    const generateOTPResponse = await sendRequest<
      OtpCreatePayload,
      OtpCreateResponse
    >({
      path: endpoints.otp.create.path,
      method: endpoints.otp.create.method,
      payload: {
        email,
      },
    });

    if (generateOTPResponse.success === false) {
      return {
        error: ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_CREATED,
        success: false,
        data: undefined,
      };
    }

    try {
      await sendEmail({
        email,
        emailTemplate: VerificationEmailTemplate({
          otp: generateOTPResponse.data.otp,
          userName
        }),
        subject: subject,
      });
    } catch (err) {
      return {
        error: ERROR.VERIFICATION_FAILED_Verification_EMAIL_CANNOT_BE_SEND,
        success: false,
        data: undefined,
      };
    }

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
