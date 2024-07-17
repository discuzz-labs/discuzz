"use server";

import { ERROR } from "@/lib/messages";
import type { ACTIONResponse } from "@/types/api";
import type { AuthLoginPayload, AuthLoginResponse } from "@/services/endpoints";
import endpoints from "@/services/endpoints";
import type { UserSessionInterface } from "@/components/providers/AuthProvider";
import log from "@/lib/log";
import sendRequest from "@/lib/sendRequest";

interface signInWithCredArgs {
  email: string;
  password: string;
}

async function signInWithCred({
  email,
  password,
}: signInWithCredArgs): Promise<ACTIONResponse<UserSessionInterface>> {
  try {
    const loginResponse = await sendRequest<
      AuthLoginPayload,
      AuthLoginResponse
    >({
      payload: {
        email,
        password,
      },
      path: endpoints.auth.login.path,
      method: endpoints.auth.login.method,
    });

    if (loginResponse.data == null || loginResponse.error) {
      return {
        error: loginResponse.error
          ? loginResponse.error
          : ERROR.LOGIN_FAILED_WRONG_CREDENTIALS,
        success: false,
        data: undefined,
      };
    }

    return {
      success: true,
      error: null,
      data: {
        email,
        imageURL: loginResponse.data.imageURL ?? "",
        fullName: loginResponse.data.fullName ?? "",
        verified: loginResponse.data.verified ?? false,
      },
    };
  } catch (err) {
    log("actions", err, "ACTIONS sign-in/signInWithCred");
    return { error: ERROR.API_IS_UNREACHABLE, success: false, data: undefined };
  }
}

export default signInWithCred;
