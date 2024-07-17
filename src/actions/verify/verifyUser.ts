"use server";

import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import sendRequest from "@/lib/sendRequest";
import type {
  AuthVerifyPayload,
  AuthVerifyResponse,
  OtpVerifyPayload,
  OtpVerifyResponse,
} from "@/services/endpoints";
import endpoints from "@/services/endpoints";
import type { ACTIONResponse } from "@/types/api";

interface verifyUserProps {
  email: string;
  otp: string;
}

async function verifyUser({
  email,
  otp,
}: verifyUserProps): Promise<ACTIONResponse<undefined>> {
  try {
    const verifyOTPResponse = await sendRequest<
      OtpVerifyPayload,
      OtpVerifyResponse
    >({
      path: endpoints.otp.verify.path,
      method: endpoints.otp.verify.method,
      payload: {
        otp,
        email,
      },
    });

    if (verifyOTPResponse.success === false) {
      return {
        error: ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_VERIFIED,
        success: false,
        data: undefined,
      };
    }

    if (verifyOTPResponse.data.verified === false) {
      return {
        error: ERROR.VERIFICATION_FAILED_OTP_INVALID,
        success: false,
        data: undefined,
      };
    }

    const verifyUserResponse = await sendRequest<
      AuthVerifyPayload,
      AuthVerifyResponse
    >({
      path: endpoints.auth.verify.path,
      method: endpoints.auth.verify.method,
      payload: {
        email,
      },
    });

    if (verifyUserResponse.success === false) {
      return {
        error: ERROR.VERIFICATION_FAILED_USER_BE_VERIFIED,
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
    log("actions", err, "ACTIONS verify/verifyUser");
    return { error: ERROR.API_IS_UNREACHABLE, success: false, data: undefined };
  }
}

export default verifyUser;
