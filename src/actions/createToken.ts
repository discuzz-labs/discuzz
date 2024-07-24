"use server";

import { ERROR } from "@/lib/messages";
import type { ACTIONResponse } from "@/types/types";
import { generatetoken } from "@/services/token";
import Profile, { ProfileErrorType } from "@/database/Profile";
import log from "@/lib/log";

interface createResetTokenProps {
  email: string;
}

async function createToken({
  email,
}: createResetTokenProps): Promise<ACTIONResponse<{ token: string }>> {
  try {
    const generatedToken = generatetoken(email, 1);

    if (generatedToken.success === false || !generatedToken.payload) {
      return {
        error: ERROR.IDENTIFICATION_FAILED_TOKEN_INVALID,
        success: false,
        data: undefined,
      };
    }


    const userProfile = new Profile({
      email,
      valuesToUpdate: {
        token: generatedToken.payload.token,
      },
    });

    const updateResult = await userProfile.updateProfileByEmail();

    if (updateResult.success === false && updateResult.error) {
      return {
        error:
          updateResult.error?.type === ProfileErrorType.UpdateProfileFailed
            ? ERROR.IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_CREATED
            : updateResult.error.origin,
        success: false,
        data: undefined,
      };
    }
    return {
      error: null,
      success: true,
      data: {token: generatedToken.payload.token},
    };
  } catch (err) {
    log("actions", err, "ACTIONS /createToken");
    return {
      error: ERROR.SERVER_ERROR,
      success: false,
      data: undefined,
    };
  }
}

export default createToken;
