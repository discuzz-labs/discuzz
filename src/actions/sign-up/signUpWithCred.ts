"use server";

import { ERROR } from "@/lib/messages";
import type { ACTIONResponse } from "@/types/types";
import type { UserSessionInterface } from "@/providers/AuthProvider";
import log from "@/lib/log";
import Profile, { ProfileErrorType } from "@/database/Profile";

interface signUpWithCredArgs {
  email: string;
  password: string;
  image: string;
  name: string;
}

async function signUpWithCred({
  email,
  password,
  image,
  name,
}: signUpWithCredArgs): Promise<ACTIONResponse<UserSessionInterface>> {
  try {
    const userProfile = new Profile({
      email,
      password,
      name,
      image,
    });
    const userRegisteration = await userProfile.save();
    if (userRegisteration.success === false && userRegisteration.error) {
      return {
        success: false,
        error:
          userRegisteration.error.type === ProfileErrorType.UserAlreadyExists
            ? ERROR.REGISTRATION_FAILED_EMAIL_ALREADY_EXISTS
            : userRegisteration.error.origin,
        data: undefined,
      };
    }
    return {
      success: true,
      error: null,
      data: { email, name, image, verified: false , id: userRegisteration.data?.id as string },
    };
  } catch (err) {
    log("actions", err, "ACTIONS sign-up/signUpWithCred");
    return { error: ERROR.SERVER_ERROR, success: false, data: undefined };
  }
}

export default signUpWithCred;
