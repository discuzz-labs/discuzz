import signUpWithCred from "@/actions/sign-up/signUpWithCred";
import { ERROR } from "@/lib/messages";
import type { APIResponse } from "@/types/types";
import endpoints from "@/services/endpoints";
import log from "@/lib/log";
import type {
  AuthRegisterResponse,
  UserFindResponse,
} from "@/services/endpoints";
import sendRequest from "@/lib/sendRequest";

// Mock dependencies
jest.mock("@/lib/sendRequest");
jest.mock("@/lib/log");

describe("ACTIONS sign-up/signUpWithCred", () => {
  const email = "test@example.com";
  const password = "password";
  const image = "http://example.com/image.jpg";
  const name = "Test User";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if the email already exists", async () => {
    const emailExistsResponse: APIResponse<UserFindResponse> = {
      status: 200,
      data: { email, name, image, verified: true },
      success: true,
      error: null,
    };

    (sendRequest as jest.Mock).mockResolvedValueOnce(emailExistsResponse);

    const result = await signUpWithCred({
      email,
      password,
      image,
      name,
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.user.find.path,
      method: endpoints.user.find.method,
      payload: {
        email,
      },
    });

    expect(result).toEqual({
      error: ERROR.REGISTRATION_FAILED_EMAIL_ALREADY_EXISTS,
      success: false,
      data: undefined,
    });
  });

  it("should return an error if registration fails", async () => {
    const emailNotExistResponse: APIResponse<UserFindResponse> = {
      status: 200,
      data: null,
      success: true,
      error: null,
    };

    const registerErrorResponse: APIResponse<undefined> = {
      status: 500,
      data: undefined,
      success: false,
      error: "Registration error",
    };

    (sendRequest as jest.Mock)
      .mockResolvedValueOnce(emailNotExistResponse)
      .mockResolvedValueOnce(registerErrorResponse);

    const result = await signUpWithCred({
      email,
      password,
      image,
      name,
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.user.find.path,
      method: endpoints.user.find.method,
      payload: {
        email,
      },
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.auth.register.path,
      method: endpoints.auth.register.method,
      payload: {
        email,
        name,
        image,
        password,
      },
    });

    expect(result).toEqual({
      error: "Registration error",
      success: false,
      data: undefined,
    });
  });

  it("should return success if registration succeeds", async () => {
    const emailNotExistResponse: APIResponse<UserFindResponse> = {
      status: 200,
      data: null,
      success: true,
      error: null,
    };

    const registerSuccessResponse: APIResponse<AuthRegisterResponse> = {
      status: 200,
      data: { id: "5436256188199ss" },
      success: true,
      error: null,
    };

    (sendRequest as jest.Mock)
      .mockResolvedValueOnce(emailNotExistResponse)
      .mockResolvedValueOnce(registerSuccessResponse);

    const result = await signUpWithCred({
      email,
      password,
      image,
      name,
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.user.find.path,
      method: endpoints.user.find.method,
      payload: {
        email,
      },
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.auth.register.path,
      method: endpoints.auth.register.method,
      payload: {
        email,
        name,
        image,
        password,
      },
    });

    expect(result).toEqual({
      success: true,
      error: null,
      data: { email, name, image, verified: false },
    });
  });

  it("should return an error if there is a network error", async () => {
    const error = new Error("Network error");
    (sendRequest as jest.Mock).mockRejectedValue(error);

    const result = await signUpWithCred({
      email,
      password,
      image,
      name,
    });

    expect(log).toHaveBeenCalledWith(
      "actions",
      error,
      "ACTIONS sign-up/signUpWithCred"
    );
    expect(result).toEqual({
      error: ERROR.SERVER_ERROR,
      success: false,
      data: undefined,
    });
  });
});
