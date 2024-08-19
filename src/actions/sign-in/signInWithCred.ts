"use server";

import AppError from "@/services/error";
import type { UserSessionInterface } from "@/providers/AuthProvider";
import log from "@/lib/log";
import Profile from "@/database/Profile";

interface signInWithCredArgs {
  email: string;
  password: string;
}

async function signInWithCred({
  email,
  password,
}: signInWithCredArgs): Promise<UserSessionInterface> {
  try {
    const login = await new Profile({
      email,
      password,
    }).login();
    
    if (login.success === false) {
      throw new AppError("LOGIN_FAILED_INVALID_CREDENTIALS");
    }

    return {
      email,
      image: login.data?.image as string,
      name: login.data?.name as string,
      verified: login.data?.verified as boolean,
      id: login.data?.id as string,
    };
  } catch (err : any) {
    if(err instanceof AppError) throw err
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default signInWithCred;
