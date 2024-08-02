"use server";

import { generatetoken } from "@/services/token";
import Profile from "@/database/Profile";
import log from "@/lib/log";
import AppError from "@/services/error";

interface createResetTokenArgs {
  email: string;
}

async function createToken({ email }: createResetTokenArgs): Promise<string> {
  try {
    const tokenGenerate = generatetoken(email, Date.now() + 600000);

    if (tokenGenerate.success === false || !tokenGenerate.payload) {
      throw new AppError("IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_CREATED");
    }

    const profileUpdate = await new Profile({
      email,
      valuesToUpdate: {
        token: tokenGenerate.payload.token,
      },
    }).updateProfile();

    if (profileUpdate.success === false) {
      throw new AppError("IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_CREATED");
    }

    return tokenGenerate.payload.token;
  } catch (err : any) {
    if(err instanceof AppError) throw err
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default createToken;
