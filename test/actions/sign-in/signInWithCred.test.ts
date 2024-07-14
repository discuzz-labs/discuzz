// @ts-ignore
import signInWithCred from "@/actions/sign-in/signInWithCred"; // Adjust the import path
// @ts-ignore
import { ERROR } from "@/lib/messages";
// @ts-ignore
import { User } from "@/types/database";
// @ts-ignore
import { APIResponse } from "@/types/api";
// @ts-ignore
import endpoints from "@/services/endpoints";
// @ts-ignore
import log from "@/lib/log";

// Mock dependencies
global.fetch = jest.fn();
jest.mock("@/lib/log");

describe("ACTIONS sign-in/signInWithCred", () => {
  const email = "test@example.com";
  const password = "password123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return success and user data if login is successful", async () => {
    const userData: Partial<User> = {
      email,
      name: "Test User",
      imageURL: "http://example.com/image.jpg",
      verified: true,
    };
    const apiResponse: APIResponse<User> = {
      status: 200,
      data: userData,
      success: true,
      error: null,
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiResponse),
    });

    const result = await signInWithCred({ email, password });

    expect(fetch).toHaveBeenCalledWith(endpoints.auth.login.path, {
      method: endpoints.auth.login.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    expect(result).toEqual({
      success: true,
      error: null,
      data: {
        email,
        imageURL: userData.imageURL,
        fullName: userData.name,
        verified: userData.verified,
      },
    });
  });

  it("should return an error if login credentials are incorrect", async () => {
    const apiResponse: APIResponse<null> = {
      status: 401,
      data: null,
      success: false,
      error: ERROR.LOGIN_FAILED_WRONG_CREDENTIALS,
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiResponse),
    });

    const result = await signInWithCred({ email, password });

    expect(result).toEqual({
      success: false,
      error: ERROR.LOGIN_FAILED_WRONG_CREDENTIALS,
      data: undefined,
    });
  });

  it("should return an error if there is an API error", async () => {
    const error = new Error("Network error");
    (fetch as jest.Mock).mockRejectedValue(error);

    const result = await signInWithCred({ email, password });

    expect(log).toHaveBeenCalledWith(
      "actions",
      error,
      "ACTIONS sign-in/signInWithCred"
    );
    expect(result).toEqual({
      success: false,
      error: ERROR.API_IS_UNREACHABLE,
      data: undefined,
    });
  });
});
