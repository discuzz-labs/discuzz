"use server";

import { ERROR } from "@/lib/messages";
import { User } from "@/types/database";
import { ACTIONResponse, APIResponse } from "@/types/api";
import endpoints from "@/services/endpoints";
import { UserSessionInterface } from "@/components/providers/AuthProvider";
import log from "@/lib/log";

interface signUpWithCredArgs {
  email: string;
  password: string;
  imageURL: string;
  fullName: string;
}

async function signUpWithCred({
  email,
  password,
  imageURL,
  fullName,
}: signUpWithCredArgs): Promise<ACTIONResponse<UserSessionInterface>> {
  try {
    const verifyEmailExsitenceRequest = await fetch(endpoints.user.find.path, {
      method: endpoints.user.find.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const verifyEmailExsitenceResponse: APIResponse<User> =
      await verifyEmailExsitenceRequest.json();
    if (
      verifyEmailExsitenceResponse.data == null ||
      verifyEmailExsitenceResponse.error
    ) {
      return {
        error: verifyEmailExsitenceResponse.error
          ? verifyEmailExsitenceResponse.error
          : ERROR.REGISTERATION_FAILED_EMAIL_ALREADY_EXSITS,
        success: false,
        data: undefined,
      };
    }

    const registerRequest = await fetch(endpoints.auth.register.path, {
      method: endpoints.auth.register.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        fullName,
        imageURL,
        password,
      }),
    });
    const registerResponse: APIResponse<User> = await registerRequest.json();
    if (registerResponse.error) {
      return {
        error: registerResponse.error,
        success: false,
        data: undefined,
      };
    }
    return {
      success: true,
      error: null,
      data: { email, fullName, imageURL, verified: false },
    };
  } catch (err) {
    log("actions", err, `ACTIONS sign-up/signUpWithCred`);
    return { error: ERROR.API_IS_UNREACHABLE, success: false, data: undefined };
  }
}

export default signUpWithCred;
