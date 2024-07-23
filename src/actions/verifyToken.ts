"use server";

import Profile, { ProfileErrorType } from "@/database/Profile";
import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import { checktoken } from "@/services/token";
import type { ACTIONResponse } from "@/types/types";

interface verifyUserResetTokenProps {
  token: string;
}

async function verifyToken({
  token,
}: verifyUserResetTokenProps): Promise<ACTIONResponse<{email: string}>> {
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
    });

    const userFetchResult = await userProfile.findByEmail();

    if (userFetchResult.success === false && userFetchResult.error) {
      return {
        error:
          userFetchResult.error?.type === ProfileErrorType.CannotFindProfile
            ? ERROR.IDENTIFICATION__FAILED_Token_CANNOT_BE_VERIFIED
            : userFetchResult.error.origin,
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
    return { error: ERROR.SERVER_ERROR, success: false, data: undefined };
  }
}

export default verifyToken;
