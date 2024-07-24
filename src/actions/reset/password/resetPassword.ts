"use server";

import Profile, { ProfileErrorType } from "@/database/Profile";
import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import type { ACTIONResponse } from "@/types/types";

interface resetPasswordProps {
  email: string;
  password: string;
}

async function resetPassword({
  email,
  password,
}: resetPasswordProps): Promise<ACTIONResponse<undefined>> {
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
            : passwordChangeResult.error.origin,
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
