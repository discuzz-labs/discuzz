"use server";

import error from "@/services/error";
import type { UserSessionInterface } from "@/providers/AuthProvider";
import log from "@/lib/log";
import Profile from "@/database/Profile";

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
}: signUpWithCredArgs): Promise<UserSessionInterface> {
  try {
    const save = await new Profile({
      email,
      password,
      name,
      image,
    }).save();

    if (save.success === false) {
      throw new Error(error("REGISTRATION_FAILED_EMAIL_ALREADY_EXISTS"));
    }
    return {
      email,
      name,
      image,
      verified: false,
      id: save.data?.id as string,
    };
  } catch (err) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new Error(error("SERVER_ERROR"));
  }
}

export default signUpWithCred;
