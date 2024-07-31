"use server";

import Profile from "@/database/Profile";
import log from "@/lib/log";
import error from "@/services/error";
import { checktoken } from "@/services/token";

interface verifyUserResetTokenArgs {
  token: string;
}

async function verifyToken({
  token,
}: verifyUserResetTokenArgs): Promise<string> {
  try {
    const tokenCheck = checktoken(token);

    if (tokenCheck.success === false || !tokenCheck.payload) {
      throw new Error(error("IDENTIFICATION_FAILED_TOKEN_INVALID"));
    }

    const profile = new Profile({
      email: tokenCheck.payload.token.email,
      valuesToUpdate: {
        token: "",
      },
    });
    const userFind = await profile.find();

    if (userFind.success === false) {
      throw new Error(error("IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_VERIFIED"));
    }

    const deleteTokenResult = await profile.updateProfile();
    if (deleteTokenResult.success === false && deleteTokenResult.error) {
      throw new Error(error("IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_VERIFIED"));
    }

    return tokenCheck.payload.token.email;
  } catch (err) {
    log("actions", err, `ACTIONS ${__filename}`);
    console.log(err);
    throw new Error(error("SERVER_ERROR"));
  }
}

export default verifyToken;
