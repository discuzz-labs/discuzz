import sendVerificationEmail from "@/actions/verify/sendVerificationEmail"; // Adjust the import path
import log from "@/lib/log";
import { ERROR } from "@/lib/messages";
import sendRequest from "@/lib/sendRequest";
import endpoints, { OtpCreateResponse } from "@/services/endpoints";
import sendEmail from "@/services/sendEmail";
import { APIResponse } from "@/types/types";
import VerificationEmailTemplate, {
  subject,
} from "@/emailTemplate/Verificationemail.email";

// Mock dependencies
jest.mock("@/lib/sendRequest");
jest.mock("@/services/sendEmail");
jest.mock("@/lib/log");

describe("ACTIONS verify/sendVerificationEmail", () => {
  const email = "test@example.com";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if OTP generation fails", async () => {
    const otpErrorResponse: APIResponse<undefined> = {
      status: 500,
      data: undefined,
      success: false,
      error: "OTP generation error",
    };

    (sendRequest as jest.Mock).mockResolvedValueOnce(otpErrorResponse);

    const result = await sendVerificationEmail({
      email,
      userName: "Test User",
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.otp.create.path,
      method: endpoints.otp.create.method,
      payload: {
        email,
      },
    });

    expect(result).toEqual({
      error: ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_CREATED,
      success: false,
      data: undefined,
    });
  });

  it("should return an error if sending Verificationation email fails", async () => {
    const otpSuccessResponse: APIResponse<OtpCreateResponse> = {
      status: 200,
      data: { otp: "123456" },
      success: true,
      error: null,
    };

    (sendRequest as jest.Mock).mockResolvedValueOnce(otpSuccessResponse);

    // Mock send email
    (sendEmail as jest.Mock).mockRejectedValue(
      new Error("Sending email failed")
    );

    const result = await sendVerificationEmail({
      email,
      userName: "Test User",
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.otp.create.path,
      method: endpoints.otp.create.method,
      payload: {
        email,
      },
    });

    expect(sendEmail).toHaveBeenCalledWith({
      email,
      emailTemplate: VerificationEmailTemplate({
        otp: "123456",
        userName: "Test User",
      }),
      subject: subject,
    });

    expect(result).toEqual({
      error: ERROR.VERIFICATION_FAILED_EMAIL_CANNOT_BE_SENT,
      success: false,
      data: undefined,
    });
  });

  it("should return success if OTP generation and email sending succeed", async () => {
    const otpSuccessResponse: APIResponse<OtpCreateResponse> = {
      status: 200,
      data: { otp: "123456" },
      success: true,
      error: null,
    };

    (sendRequest as jest.Mock).mockResolvedValueOnce(otpSuccessResponse);

    // Mock sending Email
    (sendEmail as jest.Mock).mockResolvedValueOnce("");

    const result = await sendVerificationEmail({
      email,
      userName: "Test User",
    });

    expect(sendRequest).toHaveBeenCalledWith({
      path: endpoints.otp.create.path,
      method: endpoints.otp.create.method,
      payload: {
        email,
      },
    });

    expect(sendEmail).toHaveBeenCalledWith({
      email,
      emailTemplate: VerificationEmailTemplate({
        otp: "123456",
        userName: "Test User",
      }),
      subject: subject,
    });

    expect(result).toEqual({
      error: null,
      success: true,
      data: undefined,
    });
  });

  it("should return an error if there is a network error ", async () => {
    const error = new Error("Network error");
    (sendRequest as jest.Mock).mockRejectedValue(error);

    const result = await sendVerificationEmail({
      email,
      userName: "Test User",
    });

    expect(log).toHaveBeenCalledWith(
      "actions",
      error,
      "ACTIONS verify/sendVerificationEmail"
    );
    expect(result).toEqual({
      error: ERROR.SERVER_ERROR,
      success: false,
      data: undefined,
    });
  });
});
