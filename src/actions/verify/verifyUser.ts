"use server";

import Profile, { ProfileErrorType } from "@/database/Profile";
import log from "@/lib/log";
import { ERROR } from "@/services/messages";
import type { ActionResponse } from "@/types/types";

interface verifyUserProps {
  email: string;
}

async function verifyUser({
  email,
}: verifyUserProps): Promise<ActionResponse<undefined>> {
  try {

    const userProfile = new Profile({
      email,
      valuesToUpdate: {
        verified: true,
        emailVerified: Date.now().toString()
      },
    });
    
    const userVerification = await userProfile.updateProfileByEmail();
    if (userVerification.success === false && userVerification.error) {
      return {
        error:
          userVerification.error?.type === ProfileErrorType.UpdateProfileFailed
            ? ERROR.VERIFICATION_FAILED_USER_CANNOT_BE_VERIFIED
            : ERROR.VERIFICATION_FAILED,
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

export default verifyUser;
