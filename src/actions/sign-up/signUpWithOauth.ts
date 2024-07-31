import error from "@/services/error";
import type { UserSessionInterface } from "@/providers/AuthProvider";
import log from "@/lib/log";
import Profile from "@/database/Profile";

interface signUpWithOauthArgs {
  email: string;
  name: string;
  image: string;
}

async function signUpWithOauth({
  email,
  name,
  image,
}: signUpWithOauthArgs): Promise<UserSessionInterface> {
  try {
    const saveOAuth = await new Profile({
      email,
      name,
      image,
    }).saveOAuth();

    return {
      email,
      name,
      image,
      verified: true,
      id: saveOAuth.data?.id as string,
    };
  } catch (err) {
    log("actions", err, `ACTIONS ${__filename}`);
    throw new Error(error("SERVER_ERROR"));
  }
}

export default signUpWithOauth;
