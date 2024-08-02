"use server";

import AppError from "@/services/error";
import log from "@/lib/log";
import Profile from "@/database/Profile";
import { pointsSystem } from "@/services/points";

export interface unFollowArgs {
  id: string;
  unFollowingUserId: string;
}

async function unFollow({ id, unFollowingUserId }: unFollowArgs): Promise<null> {
  try {
    const user = await new Profile({
      id,
    }).unfollow(unFollowingUserId);

    const followingUser = await new Profile({
      id: unFollowingUserId,
      valuesToUpdate: {
          points: {
            increment: -pointsSystem.follower,
          },
      }
    }).updateProfile();

    return null;
  } catch (err : any) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new AppError("SERVER_ERROR");
  }
}

export default unFollow;
