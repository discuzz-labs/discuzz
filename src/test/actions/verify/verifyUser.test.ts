import verifyUser from "@/actions/verify/verifyUser";
import sendRequest from "@/lib/sendRequest";
import { ERROR } from "@/lib/messages";
import endpoints, {
  AuthVerifyResponse,
  OtpVerifyResponse,
} from "@/services/endpoints";
import { APIResponse } from "@/types/types";

jest.mock("@/lib/sendRequest");

describe("ACTIONS verify/verifyUser", () => {
  const email = "test@example.com";
  const otp = "123456";

  it("should return success if OTP and user verification succeed", async () => {
    const otpVerifyResponse: APIResponse<OtpVerifyResponse> = {
      success: true,
      status: 200,
      data: { verified: true },
      error: null,
    };

    const userVerifyResponse: APIResponse<AuthVerifyResponse> = {
      status: 200,
      success: true,
      data: undefined,
      error: null,
    };

    (sendRequest as jest.Mock)
      .mockResolvedValueOnce(otpVerifyResponse) // OTP verification response
      .mockResolvedValueOnce(userVerifyResponse); // User verification response

    const result = await verifyUser({ email, otp });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.otp.verify.path,
      method: endpoints.otp.verify.method,
      payload: { otp, email },
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.auth.verify.path,
      method: endpoints.auth.verify.method,
      payload: { email },
    });

    expect(result).toEqual({
      error: null,
      success: true,
      data: undefined,
    });
  });

  it("should return an error if OTP verification fails", async () => {
    const otpVerifyResponse: APIResponse<undefined> = {
      status: 500,
      success: false,
      data: undefined,
      error: null,
    };

    (sendRequest as jest.Mock).mockResolvedValueOnce(otpVerifyResponse);

    const result = await verifyUser({ email, otp });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.otp.verify.path,
      method: endpoints.otp.verify.method,
      payload: { otp, email },
    });

    expect(result).toEqual({
      error: ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_VERIFIED,
      success: false,
      data: undefined,
    });
  });

  it("should return an error if OTP is invalid", async () => {
    const otpVerifyResponse: APIResponse<OtpVerifyResponse> = {
      status: 200,
      success: true,
      data: { verified: false },
      error: null,
    };

    (sendRequest as jest.Mock).mockResolvedValueOnce(otpVerifyResponse);

    const result = await verifyUser({ email, otp });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.otp.verify.path,
      method: endpoints.otp.verify.method,
      payload: { otp, email },
    });

    expect(result).toEqual({
      error: ERROR.VERIFICATION_FAILED_OTP_INVALID,
      success: false,
      data: undefined,
    });
  });

  it("should return an error if user verification fails", async () => {
    const otpVerifyResponse: APIResponse<OtpVerifyResponse> = {
      status: 200,
      success: true,
      data: { verified: true },
      error: null,
    };

    const userVerifyResponse: APIResponse<undefined> = {
      status: 500,
      success: false,
      data: undefined,
      error: null,
    };

    (sendRequest as jest.Mock)
      .mockResolvedValueOnce(otpVerifyResponse) // OTP verification response
      .mockResolvedValueOnce(userVerifyResponse); // User verification response

    const result = await verifyUser({ email, otp });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.otp.verify.path,
      method: endpoints.otp.verify.method,
      payload: { otp, email },
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.auth.verify.path,
      method: endpoints.auth.verify.method,
      payload: { email },
    });

    expect(result).toEqual({
      error: ERROR.VERIFICATION_FAILED_USER_BE_VERIFIED,
      success: false,
      data: undefined,
    });
  });

  it("should return an error if an exception occurs", async () => {
    (sendRequest as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    const result = await verifyUser({ email, otp });

    expect(result).toEqual({
      error: ERROR.SERVER_ERROR,
      success: false,
      data: undefined,
    });
  });
});
