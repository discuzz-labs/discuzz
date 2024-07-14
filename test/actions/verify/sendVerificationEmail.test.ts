// @ts-ignore
import sendVerificationEmail from "@/actions/verify/sendVerificationEmail"; // Adjust the import path
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

describe("sendVerificationEmail", () => {
  const email = "test@example.com";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if OTP generation fails", async () => {
    const otpErrorResponse: APIResponse<string> = {
      status: 500,
      data: undefined,
      success: false,
      error: "OTP generation error",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(otpErrorResponse),
    });

    const result = await sendVerificationEmail({ email });

    expect(fetch).toHaveBeenCalledWith(endpoints.otp.create.path, {
      method: endpoints.otp.create.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    expect(result).toEqual({
      error: ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_CREATED,
      success: false,
      data: undefined,
    });
  });

  it("should return an error if sending confirmation email fails", async () => {
    const otpSuccessResponse: APIResponse<string> = {
      status: 200,
      data: "123456",
      success: true,
      error: null,
    };

    const emailErrorResponse: APIResponse<undefined> = {
      status: 500,
      data: undefined,
      success: false,
      error: "Email sending error",
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(otpSuccessResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(emailErrorResponse),
      });

    const result = await sendVerificationEmail({ email });

    expect(fetch).toHaveBeenCalledWith(endpoints.otp.create.path, {
      method: endpoints.otp.create.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    expect(fetch).toHaveBeenCalledWith(endpoints.email.confirm.path, {
      method: endpoints.email.confirm.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp: otpSuccessResponse.data }),
    });

    expect(result).toEqual({
      error: ERROR.VERIFICATION_FAILED_CONFIRM_EMAIL_CANNOT_BE_SEND,
      success: false,
      data: undefined,
    });
  });

  it("should return success if OTP generation and email sending succeed", async () => {
    const otpSuccessResponse: APIResponse<string> = {
      status: 200,
      data: "123456",
      success: true,
      error: null,
    };

    const emailSuccessResponse: APIResponse<undefined> = {
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
        json: jest.fn().mockResolvedValue(emailSuccessResponse),
      });

    const result = await sendVerificationEmail({ email });

    expect(fetch).toHaveBeenCalledWith(endpoints.otp.create.path, {
      method: endpoints.otp.create.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    expect(fetch).toHaveBeenCalledWith(endpoints.email.confirm.path, {
      method: endpoints.email.confirm.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp: otpSuccessResponse.data }),
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

    const result = await sendVerificationEmail({ email });

    expect(log).toHaveBeenCalledWith(
      "actions",
      error,
      "ACTIONS verify/sendVerificationEmail"
    );
    expect(result).toEqual({
      error: ERROR.API_IS_UNREACHABLE,
      success: false,
      data: undefined,
    });
  });
});
