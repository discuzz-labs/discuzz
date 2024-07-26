"use server";

import Profile, { ProfileErrorType } from "@/database/Profile";
import log from "@/lib/log";
import { ERROR } from "@/services/messages";
import type { ActionResponse } from "@/types/types";

interface resetPasswordProps {
  email: string;
  password: string;
}

async function resetPassword({
  email,
  password,
}: resetPasswordProps): Promise<ActionResponse<undefined>> {
  try {
    const userProfile = new Profile({
      email,
      password,
    });

    const passwordChangeResult = await userProfile.changePassword();
    if (passwordChangeResult.success === false && passwordChangeResult.error) {
      return {
        error: 
          passwordChangeResult.error?.type ===
          ProfileErrorType.changePassword
            ? ERROR.RESETPASSWORD_FAILED_PASSWORD_CANNOT_BE_CHANGED
            : ERROR.RESETPASSWORD_FAILED,
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
    log("actions", err, "ACTIONS reset/password/resetPassword");
    return { error: ERROR.SERVER_ERROR, success: false, data: undefined };
  }
}

export default resetPassword;
