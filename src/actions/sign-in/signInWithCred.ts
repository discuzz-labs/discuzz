"use server";

import { ERROR } from "@/lib/messages";
import type { User } from "@/types/database";
import type { ACTIONResponse, APIResponse } from "@/types/api";
import endpoints from "@/services/endpoints";
import type { UserSessionInterface } from "@/components/providers/AuthProvider";
import log from "@/lib/log";

interface signInWithCredArgs {
  email: string;
  password: string;
}

async function signInWithCred({
  email,
  password,
}: signInWithCredArgs): Promise<ACTIONResponse<UserSessionInterface>> {
  try {
    const loginRequest = await fetch(endpoints.auth.login.path, {
      method: endpoints.auth.login.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const loginResponse: APIResponse<User | null> = await loginRequest.json();

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
          imageURL: loginResponse.data.imageURL,
          fullName: loginResponse.data.fullName,
          verified: loginResponse.data.verified,
        },
      };
  } catch (err) {
    log("actions", err, "ACTIONS sign-in/signInWithCred");
    return { error: ERROR.API_IS_UNREACHABLE, success: false, data: undefined };
  }
}

export default signInWithCred;
