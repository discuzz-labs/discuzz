"use server";

import AppError from "@/services/error";
import log from "@/lib/log";
import Profile from "@/database/Profile";
import { pointsSystem } from "@/services/points"

export interface followArgs {
  id: string;
  followingUserId: string;
}

async function follow({ id, followingUserId }: followArgs): Promise<null> {
  try {
    const user = await new Profile({
      id
    }).follow(followingUserId);
    
    const followingUser = await new Profile({
      id: followingUserId,
      valuesToUpdate: {
        points: pointsSystem.follower
      }
    }).updateProfile();

    return null;
  } catch (err : any) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default follow;
