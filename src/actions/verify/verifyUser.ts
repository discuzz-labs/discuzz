"use server";

import Profile, { ProfileErrorType } from "@/database/Profile";
import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import type { ACTIONResponse } from "@/types/types";

interface verifyUserProps {
  id: string;
}

async function verifyUser({
  id,
}: verifyUserProps): Promise<ACTIONResponse<undefined>> {
  try {

    const userProfile = new Profile({
      id,
      valuesToUpdate: {
        verified: true,
      },
    });
    
    const userVerification = await userProfile.updateProfile();
    if (userVerification.success === false && userVerification.error) {
      return {
        error:
          userVerification.error?.type === ProfileErrorType.UpdateProfileFailed
            ? ERROR.VERIFICATION_FAILED_USER_CANNOT_BE_VERIFIED
            : userVerification.error.origin,
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
