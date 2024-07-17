"use server";

import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import type { OtpCreatePayload, OtpCreateResponse } from "@/services/endpoints";
import endpoints from "@/services/endpoints";
import sendEmail from "@/services/sendEmail";
import type { ACTIONResponse } from "@/types/api";
import ConfirmEmailTemplate, { subject } from "@/email/confirmemail.email";
import sendRequest from "@/lib/sendRequest";

interface sendVerificationEmailProps {
  email: string;
}

async function sendVerificationEmail({
  email,
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

    if (
      generateOTPResponse.success === false &&
      generateOTPResponse.data.otp !== ""
    ) {
      return {
        error: ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_CREATED,
        success: false,
        data: undefined,
      };
    }

    await sendEmail({
      email,
      emailTemplate: ConfirmEmailTemplate({
        otp: generateOTPResponse.data.otp,
      }),
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
