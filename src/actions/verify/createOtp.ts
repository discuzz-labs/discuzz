"use server";

import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import type { ACTIONResponse } from "@/types/types";
import Profile,  { ProfileErrorType }  from "@/database/Profile";
import { generateOTP } from "@/services/otp";

interface createOtpProps {
  id: string;
}

async function createOtp({
  id,
}: createOtpProps): Promise<ACTIONResponse<undefined | { otp: string }>> {
  try {
    const otp = generateOTP();
    
    const userProfile = new Profile({
        id: id,
        valuesToUpdate: {
            OTP: otp,
            TTL: Date.now().toString(),
        },
      });
      const userAssignOtp = await userProfile.updateProfile();
      if (userAssignOtp.success === false && userAssignOtp.error) {
        return {
          error:
          userAssignOtp.error?.type === ProfileErrorType.UpdateProfileFailed
              ? ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_CREATED
              : userAssignOtp.error.origin,
          success: false,
          data: undefined,
        };
      }

    return {
      error: null,
      success: true,
      data: { otp },
    };
  } catch (err) {
    log("actions", err, "ACTIONS verify/createOtp");
    return { error: ERROR.SERVER_ERROR, success: false, data: undefined };
  }
}

export default createOtp;
