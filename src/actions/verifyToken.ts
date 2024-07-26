"use server";

import Profile, { ProfileErrorType } from "@/database/Profile";
import log from "@/lib/log";
import { ERROR } from "@/services/messages";
import { checktoken } from "@/services/token";
import type { ActionResponse } from "@/types/types";

interface verifyUserResetTokenProps {
  token: string;
}

async function verifyToken({
  token,
}: verifyUserResetTokenProps): Promise<ActionResponse<{email: string}>> {
  try {
    const verifiedToken = checktoken(token);

    if (verifiedToken.success === false || !verifiedToken.payload) {
      return {
        error: ERROR.IDENTIFICATION_FAILED_TOKEN_INVALID,
        success: false,
        data: undefined,
      };
    }

    const userProfile = new Profile({
      email: verifiedToken.payload.token.email,
      valuesToUpdate : {
        token: ""
      }
    });

    const userFetchResult = await userProfile.findByEmail();

    if (userFetchResult.success === false && userFetchResult.error) {
      return {
        error:
          userFetchResult.error?.type === ProfileErrorType.CannotFindProfile
            ? ERROR.IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_VERIFIED
            :  ERROR.IDENTIFICATION_FAILED,
        success: false,
        data: undefined,
      };
    }
    
    const deleteTokenResult = await userProfile.updateProfileByEmail()
    if (deleteTokenResult.success === false && deleteTokenResult.error) {
      return {
        error:
        deleteTokenResult.error?.type === ProfileErrorType.UpdateProfileFailed
            ? ERROR.IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_VERIFIED
            :  ERROR.IDENTIFICATION_FAILED,
        success: false,
        data: undefined,
      };
    }

    return {
      error: null,
      success: true,
      data: {email: verifiedToken.payload.token.email},
    };
  } catch (err) {
    log("actions", err, "ACTIONS /verifyToken");
    console.log(err)
    return { error: ERROR.SERVER_ERROR , success: false, data: undefined };
  }
}

export default verifyToken;
