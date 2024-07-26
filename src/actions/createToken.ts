"use server";

import type { ActionResponse } from "@/types/types";
import { generatetoken } from "@/services/token";
import Profile, { ProfileErrorType } from "@/database/Profile";
import log from "@/lib/log";
import { ERROR } from '@/services/messages';

interface createResetTokenProps {
  email: string;
}

async function createToken({
  email,
}: createResetTokenProps): Promise<ActionResponse<{ token: string }>> {
  try {
    const generatedToken = generatetoken(email, Date.now() + 600000);

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
            ?ERROR.IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_CREATED
            : ERROR.IDENTIFICATION_FAILED,
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
