"use server";

import { generatetoken } from "@/services/token";
import Profile from "@/database/Profile";
import log from "@/lib/log";
import error from "@/services/error";

interface createResetTokenArgs {
  email: string;
}

async function createToken({ email }: createResetTokenArgs): Promise<string> {
  try {
    const tokenGenerate = generatetoken(email, Date.now() + 600000);

    if (tokenGenerate.success === false || !tokenGenerate.payload) {
      throw new Error(error("IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_CREATED"));
    }

    const profileUpdate = await new Profile({
      email,
      valuesToUpdate: {
        token: tokenGenerate.payload.token,
      },
    }).updateProfile();

    if (profileUpdate.success === false) {
      throw new Error(error("IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_CREATED"));
    }

    return tokenGenerate.payload.token;
  } catch (err) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new Error(error("SERVER_ERROR"));
  }
}

export default createToken;
