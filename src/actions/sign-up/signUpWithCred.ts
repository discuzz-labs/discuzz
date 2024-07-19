"use server";

import { ERROR } from "@/lib/messages";
import type { ACTIONResponse } from "@/types/api";
import type {
  AuthRegisterPayload,
  AuthRegisterResponse,
  UserFindPayload,
  UserFindResponse,
} from "@/services/endpoints";
import endpoints from "@/services/endpoints";
import type { UserSessionInterface } from "@/components/providers/AuthProvider";
import log from "@/lib/log";
import sendRequest from "@/lib/sendRequest";

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
    const verifyEmailExsitenceResponse = await sendRequest<
      UserFindPayload,
      UserFindResponse
    >({
      path: endpoints.user.find.path,
      method: endpoints.user.find.method,
      payload: {
        email,
      },
    });

    if (
      verifyEmailExsitenceResponse.data !== null ||
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

    const registerResponse = await sendRequest<
      AuthRegisterPayload,
      AuthRegisterResponse
    >({
      path: endpoints.auth.register.path,
      method: endpoints.auth.register.method,
      payload: {
        email: email.toLowerCase(),
        fullName,
        imageURL,
        password,
      },
    });

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
    log("actions", err, "ACTIONS sign-up/signUpWithCred");
    return { error: ERROR.API_IS_UNREACHABLE, success: false, data: undefined };
  }
}

export default signUpWithCred;
