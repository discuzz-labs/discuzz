"use server";

import { ERROR } from "@/lib/messages";
import type { ACTIONResponse } from "@/types/types";
import type { UserSessionInterface } from "@/providers/AuthProvider";
import log from "@/lib/log";
import Profile, { ProfileErrorType } from "@/database/Profile";

interface signInWithCredArgs {
  email: string;
  password: string;
}

async function signInWithCred({
  email,
  password,
}: signInWithCredArgs): Promise<ACTIONResponse<UserSessionInterface>> {
  try {
    const userProfile = new Profile({
      email,
      password,
    });
    const userLogin = await userProfile.login()
    
    if(userLogin.success === false && userLogin.error){
      return {
        success: false,
        error:
          userLogin.error.type === ProfileErrorType.CannotLoginWithProfile
            ? ERROR.LOGIN_FAILED_WRONG_CREDENTIALS
            : userLogin.error.origin,
        data: undefined,
      };
    }

    return {
      success: true,
      error: null,
      data: {
        email,
        image: userLogin.data?.image as string,
        name: userLogin.data?.name as string,
        verified: userLogin.data?.verified as boolean,
        id: userLogin.data?.id as string
      },
    };
  } catch (err) {
    log("actions", err, "ACTIONS sign-in/signInWithCred");
    return { error: ERROR.SERVER_ERROR, success: false, data: undefined };
  }
}

export default signInWithCred;
