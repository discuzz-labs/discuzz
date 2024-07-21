import signInWithCred from "@/actions/sign-in/signInWithCred";
import { ERROR } from "@/lib/messages";
import type { APIResponse } from "@/types/types";
import endpoints from "@/services/endpoints";
import log from "@/lib/log";
import type { AuthLoginResponse } from "@/services/endpoints";
import sendRequest from "@/lib/sendRequest";

// Mock dependencies
jest.mock("@/lib/sendRequest");
jest.mock("@/lib/log");

describe("ACTIONS sign-in/signInWithCred", () => {
  const email = "test@example.com";
  const password = "password123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return success and user data if login is successful", async () => {
    const userData: AuthLoginResponse = {
      email,
      name: "Test User",
      image: "http://example.com/image.jpg",
      verified: true,
    };
    const apiResponse: APIResponse<AuthLoginResponse> = {
      status: 200,
      data: userData,
      success: true,
      error: null,
    };

    (sendRequest as jest.Mock).mockResolvedValue(apiResponse);

    const result = await signInWithCred({ email, password });

    expect(sendRequest).toHaveBeenCalledWith({
      payload: {
        email,
        password,
      },
      path: endpoints.auth.login.path,
      method: endpoints.auth.login.method,
    });

    expect(result).toEqual({
      success: true,
      error: null,
      data: {
        email,
        image: userData.image,
        name: userData.name,
        verified: userData.verified,
      },
    });
  });

  it("should return an error if login credentials are incorrect", async () => {
    const apiResponse: APIResponse<undefined> = {
      status: 500,
      data: undefined,
      success: false,
      error: null,
    };

    (sendRequest as jest.Mock).mockResolvedValue(apiResponse);

    const result = await signInWithCred({ email, password });

    expect(result).toEqual({
      success: false,
      error: ERROR.LOGIN_FAILED_WRONG_CREDENTIALS,
      data: undefined,
    });
  });

  it("should return an error if there is an API error", async () => {
    const error = new Error("Network error");
    (sendRequest as jest.Mock).mockRejectedValue(error);

    const result = await signInWithCred({ email, password });

    expect(log).toHaveBeenCalledWith(
      "actions",
      error,
      "ACTIONS sign-in/signInWithCred"
    );
    expect(result).toEqual({
      success: false,
      error: ERROR.SERVER_ERROR,
      data: undefined,
    });
  });
});
