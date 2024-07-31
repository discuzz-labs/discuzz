"use server";

import error from "@/services/error";
import type { UserWithCounts } from "@/types/types";
import log from "@/lib/log";
import Profile from "@/database/Profile";

interface getUserInfoArgs {
  id: string;
}

async function getUserInfo({ id }: getUserInfoArgs): Promise<UserWithCounts> {
  try {
    const userWithCounts = await new Profile({
      id,
    }).find();

    if (userWithCounts.success === false || !userWithCounts.data) {
      throw new Error(error("USER_FETCH_FAILED_NOT_FOUND"));
    }

    return userWithCounts.data;
  } catch (err) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new Error(error("SERVER_ERROR"));
  }
}

export default getUserInfo;
