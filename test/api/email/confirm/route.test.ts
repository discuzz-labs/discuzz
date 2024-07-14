// @ts-ignore
import log from "@/lib/log";
// @ts-ignore
import sendEmail from "@/services/sendEmail";
// @ts-ignore
import ConfirmEmailTemplate from "@/templates/confirmemail.email";
// @ts-ignore
import { type APIResponse } from "@/types/api";
import { type NextRequest, NextResponse } from "next/server";
import { createMocks } from "node-mocks-http";
// @ts-ignore
import { POST } from "@/app/api/email/confirm/route"; // Adjust the import path

// Mock dependencies
jest.mock("@/lib/log");
jest.mock("@/services/sendEmail");
jest.mock("@/templates/confirmemail.email", () => jest.fn());
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/email/confirm", () => {
  const email = "test@example.com";
  const otp = "123456";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send an email and return 200 if successful", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { email, otp },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(sendEmail).toHaveBeenCalledWith({
      email,
      emailTemplate: ConfirmEmailTemplate({ otp }),
      subject: "Confirmation Email",
    });
    expect(jsonMock).toHaveBeenCalledWith(
      {
        status: 200,
        success: true,
        data: undefined,
        error: null,
      } satisfies APIResponse<undefined>,
      { status: 200 }
    );
  });

  it("should log an error and return 500 if sendEmail fails", async () => {
    const error = new Error("Email service error");
    (sendEmail as jest.Mock).mockRejectedValue(error);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, otp },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(sendEmail).toHaveBeenCalledWith({
      email,
      emailTemplate: ConfirmEmailTemplate({ otp }),
      subject: "Confirmation Email",
    });
    expect(log).toHaveBeenCalledWith("api", error, "POST /api/email/confirm");
    expect(jsonMock).toHaveBeenCalledWith(
      {
        error,
        status: 500,
        success: false,
        data: undefined,
      } satisfies APIResponse<undefined>,
      { status: 500 }
    );
  });
});
