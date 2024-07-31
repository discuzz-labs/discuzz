"use server";

import Profile from "@/database/Profile";
import log from "@/lib/log";
import error from "@/services/error";

interface verifyUserArgs {
  email: string;
}

async function verifyUser({ email }: verifyUserArgs): Promise<null> {
  try {
    const profileUpdate = await new Profile({
      email,
      valuesToUpdate: {
        verified: true,
        emailVerified: new Date(),
      },
    }).updateProfile();

    if (profileUpdate.success) {
      throw new Error(error("VERIFICATION_FAILED_USER_CANNOT_BE_VERIFIED"));
    }

    return null;
  } catch (err) {
    log("actions", err, "ACTIONS verify/verifyUser");
    throw new Error(error("SERVER_ERROR"));
  }
}

export default verifyUser;
