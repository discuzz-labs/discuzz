import { type NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { type APIResponse } from "@/types/api";
// @ts-ignore
import prisma from "@/lib/prisma";
// @ts-ignore
import log from "@/lib/log";
// @ts-ignore
import { generateOTP } from "@/services/otp";
// @ts-ignore
import { POST } from "@/app/api/otp/create/route"; // Adjust the import path
import { createMocks } from "node-mocks-http";

// Mock dependencies
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      update: jest.fn(),
    },
  },
}));

jest.mock("@/lib/log");
jest.mock("@/services/otp");
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/otp/create", () => {
  const email = "test@example.com";
  const otp = "123456";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and OTP if user is found and updated", async () => {
    (generateOTP as jest.Mock).mockReturnValue(otp);
    (prisma.user.update as jest.Mock).mockResolvedValue({
      OTP: otp,
      TTL: Date.now().toString(),
    });

    const { req, res } = createMocks({
      method: "POST",
      body: { email },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(generateOTP).toHaveBeenCalled();
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email },
      data: {
        OTP: otp,
        TTL: expect.any(String),
      },
    });
    expect(jsonMock).toHaveBeenCalledWith(
      {
        status: 200,
        data: otp,
        success: true,
        error: null,
      } satisfies APIResponse<string>,
      { status: 200 }
    );
  });

  it("should return 500 if there is an error", async () => {
    const error = new Error("Database error");
    (generateOTP as jest.Mock).mockReturnValue(otp);
    (prisma.user.update as jest.Mock).mockRejectedValue(error);

    const { req, res } = createMocks({
      method: "POST",
      body: { email },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(generateOTP).toHaveBeenCalled();
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email },
      data: {
        OTP: otp,
        TTL: expect.any(String),
      },
    });
    expect(log).toHaveBeenCalledWith("api", error, "PUT /api/otp");
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
