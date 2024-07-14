// @ts-ignore
import verifyUser from "@/actions/verify/verifyUser";
// @ts-ignore
import log from "@/lib/log";
// @ts-ignore
import { ERROR } from "@/lib/messages";
// @ts-ignore
import endpoints from "@/services/endpoints";
// @ts-ignore
import { APIResponse } from "@/types/api";

// Mock dependencies
global.fetch = jest.fn();
jest.mock("@/lib/log");

describe("ACTIONS verify/verifyUser", () => {
  const email = "test@example.com";
  const otp = "123456";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if OTP verification fails", async () => {
    const otpErrorResponse: APIResponse<undefined> = {
      status: 400,
      data: undefined,
      success: false,
      error: "OTP verification failed",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(otpErrorResponse),
    });

    const result = await verifyUser({ email, otp });

    expect(fetch).toHaveBeenCalledWith(endpoints.otp.verify.path, {
      method: endpoints.otp.verify.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    expect(result).toEqual({
      error: ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_VERIFIED,
      success: false,
      data: undefined,
    });
  });

  it("should return an error if user verification fails", async () => {
    const otpSuccessResponse: APIResponse<undefined> = {
      status: 200,
      data: undefined,
      success: true,
      error: null,
    };

    const userVerificationErrorResponse: APIResponse<undefined> = {
      status: 400,
      data: undefined,
      success: false,
      error: "User verification failed",
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(otpSuccessResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(userVerificationErrorResponse),
      });

    const result = await verifyUser({ email, otp });

    expect(fetch).toHaveBeenCalledWith(endpoints.otp.verify.path, {
      method: endpoints.otp.verify.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    expect(fetch).toHaveBeenCalledWith(endpoints.auth.verify.path, {
      method: endpoints.auth.verify.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    expect(result).toEqual({
      error: ERROR.VERIFICATION_FAILED_USER_BE_VERIFIED,
      success: false,
      data: undefined,
    });
  });

  it("should return success if OTP and user verification succeed", async () => {
    const otpSuccessResponse: APIResponse<undefined> = {
      status: 200,
      data: undefined,
      success: true,
      error: null,
    };

    const userVerificationSuccessResponse: APIResponse<undefined> = {
      status: 200,
      data: undefined,
      success: true,
      error: null,
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(otpSuccessResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(userVerificationSuccessResponse),
      });

    const result = await verifyUser({ email, otp });

    expect(fetch).toHaveBeenCalledWith(endpoints.otp.verify.path, {
      method: endpoints.otp.verify.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    expect(fetch).toHaveBeenCalledWith(endpoints.auth.verify.path, {
      method: endpoints.auth.verify.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    expect(result).toEqual({
      error: null,
      success: true,
      data: undefined,
    });
  });

  it("should return an error if there is a network error", async () => {
    const error = new Error("Network error");
    (fetch as jest.Mock).mockRejectedValue(error);

    const result = await verifyUser({ email, otp });

    expect(log).toHaveBeenCalledWith(
      "actions",
      error,
      "ACTIONS verify/verifyUser"
    );
    expect(result).toEqual({
      success: false,
      error: ERROR.API_IS_UNREACHABLE,
      data: undefined,
    });
  });
});
