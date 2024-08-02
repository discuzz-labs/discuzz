"use server";

import AppError from "@/services/error";
import log from "@/lib/log";
import Profile from "@/database/Profile";

interface isFollowingArgs {
  id: string;
  followingUserId: string;
}

async function isFollowing({ id, followingUserId }: isFollowingArgs): Promise<boolean> {
  try {
    const user = await new Profile({
      id,
    }).isFollowing(followingUserId);

    return user;
  } catch (err : any) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default isFollowing;
