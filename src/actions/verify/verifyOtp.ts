"use server";

import Profile, { ProfileErrorType } from "@/database/Profile";
import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import { verifyOTP } from "@/services/otp";
import type { ACTIONResponse } from "@/types/types";

interface verifyUserProps {
  id: string;
  otp: string;
}

async function verifyOtp({
  id,
  otp,
}: verifyUserProps): Promise<ACTIONResponse<undefined>> {
  try {

    const userProfile = new Profile({
      id,
      valuesToUpdate: {
        verified: true,
      },
    });

    const otpVerification = await userProfile.findById()

    if (otpVerification.success === false && otpVerification.error) {
      return {
        error:
        otpVerification.error?.type === ProfileErrorType.CannotFindProfile
            ? ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_VERIFIED
            : otpVerification.error.origin,
        success: false,
        data: undefined,
      };
    }
    if(!verifyOTP(otp, otpVerification.data?.OTP as string, otpVerification.data?.TTL as string)){
      return {
        error: ERROR.VERIFICATION_FAILED_OTP_INVALID,
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
    return { error: ERROR.SERVER_ERROR, success: false, data: undefined };
  }
}

export default verifyOtp;
