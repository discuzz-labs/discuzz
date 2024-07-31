"use server";

import Profile from "@/database/Profile";
import log from "@/lib/log";
import error from "@/services/error";

interface resetPasswordArgs {
  email: string;
  password: string;
}

async function resetPassword({
  email,
  password,
}: resetPasswordArgs): Promise<null> {
  try {
    const passwordReset = await new Profile({
      email,
      password,
    }).resetPassword();

    if (passwordReset.success === false) {
      throw new Error(error("RESETPASSWORD_FAILED_PASSWORD_CANNOT_BE_CHANGED"));
    }

    return null;
  } catch (err) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new Error(error("SERVER_ERROR"));
  }
}

export default resetPassword;
