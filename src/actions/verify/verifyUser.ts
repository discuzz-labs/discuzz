"use server";

import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import endpoints from "@/services/endpoints";
import { ACTIONResponse, APIResponse } from "@/types/api";

interface verifyUserProps {
  email: string;
  otp: string;
}

async function verifyUser({
  email,
  otp,
}: verifyUserProps): Promise<ACTIONResponse<undefined>> {
  try {
    const verifyOTPRequest = await fetch(endpoints.otp.verify.path, {
      method: endpoints.otp.verify.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const verifyOTPResponse: APIResponse<undefined> =
      await verifyOTPRequest.json();
    if (verifyOTPResponse.success == false) {
      return {
        error: ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_VERIFIED,
        success: false,
        data: undefined,
      };
    }

    const verifyUserRequest = await fetch(endpoints.auth.verify.path, {
      method: endpoints.auth.verify.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
    const verifyUserResponse: APIResponse<undefined> =
      await verifyUserRequest.json();
    if (verifyUserResponse.success == false) {
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
