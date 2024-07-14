// @ts-ignore
import signUpWithCred from "@/actions/sign-up/signUpWithCred";
// @ts-ignore
import log from "@/lib/log";
// @ts-ignore
import { ERROR } from "@/lib/messages";
// @ts-ignore
import endpoints from "@/services/endpoints";
// @ts-ignore
import { APIResponse } from "@/types/api";
// @ts-ignore
import { User } from "@/types/database";

// Mock dependencies
global.fetch = jest.fn();
jest.mock("@/lib/log");

describe("ACTIONS sign-up/signUpWithCred", () => {
  const email = "test@example.com";
  const password = "password";
  const imageURL = "http://example.com/image.jpg";
  const fullName = "Test User";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if the email already exists", async () => {
    const emailExistsResponse: APIResponse<Partial<User> | null> = {
      status: 200,
      data: { email, fullName, imageURL, verified: true },
      success: true,
      error: null,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(emailExistsResponse),
    });

    const result = await signUpWithCred({
      email,
      password,
      imageURL,
      fullName,
    });

    expect(fetch).toHaveBeenCalledWith(endpoints.user.find.path, {
      method: endpoints.user.find.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    expect(result).toEqual({
      error: ERROR.REGISTERATION_FAILED_EMAIL_ALREADY_EXSITS,
      success: false,
      data: undefined,
    });
  });

  it("should return an error if registration fails", async () => {
    const emailNotExistResponse: APIResponse<User> = {
      status: 200,
      data: null,
      success: true,
      error: null,
    };

    const registerErrorResponse: APIResponse<User> = {
      status: 500,
      data: undefined,
      success: false,
      error: "Registration error",
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(emailNotExistResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(registerErrorResponse),
      });

    const result = await signUpWithCred({
      email,
      password,
      imageURL,
      fullName,
    });

    expect(fetch).toHaveBeenCalledWith(endpoints.user.find.path, {
      method: endpoints.user.find.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    expect(fetch).toHaveBeenCalledWith(endpoints.auth.register.path, {
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

    expect(result).toEqual({
      error: "Registration error",
      success: false,
      data: undefined,
    });
  });

  it("should return success if registration succeeds", async () => {
    const emailNotExistResponse: APIResponse<User> = {
      status: 200,
      data: null,
      success: true,
      error: null,
    };

    const registerSuccessResponse: APIResponse<User> = {
      status: 200,
      data: { email, fullName, imageURL, verified: false },
      success: true,
      error: null,
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(emailNotExistResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(registerSuccessResponse),
      });

    const result = await signUpWithCred({
      email,
      password,
      imageURL,
      fullName,
    });

    expect(fetch).toHaveBeenCalledWith(endpoints.user.find.path, {
      method: endpoints.user.find.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    expect(fetch).toHaveBeenCalledWith(endpoints.auth.register.path, {
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

    expect(result).toEqual({
      success: true,
      error: null,
      data: { email, fullName, imageURL, verified: false },
    });
  });

  it("should return an error if there is a network error", async () => {
    const error = new Error("Network error");
    (fetch as jest.Mock).mockRejectedValue(error);

    const result = await signUpWithCred({
      email,
      password,
      imageURL,
      fullName,
    });

    expect(log).toHaveBeenCalledWith(
      "actions",
      error,
      "ACTIONS sign-up/signUpWithCred"
    );
    expect(result).toEqual({
      error: ERROR.API_IS_UNREACHABLE,
      success: false,
      data: undefined,
    });
  });
});
