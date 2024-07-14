import { type NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { type APIResponse } from "@/types/api";
// @ts-ignore
import prisma from "@/lib/prisma";
// @ts-ignore
import { type User } from "@/types/database";
// @ts-ignore
import log from "@/lib/log";
// @ts-ignore
import { verifyOTP } from "@/services/otp";
// @ts-ignore
import { POST } from "@/app/api/otp/verify/route";
import { createMocks } from "node-mocks-http";

// Mock dependencies
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
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

describe("POST /api/otp/verify", () => {
  const email = "test@example.com";
  const otp = "123456";
  const user: Partial<User> = {
    id: 1,
    email,
    OTP: otp,
    TTL: Date.now().toString(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and true if OTP is valid", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
    (verifyOTP as jest.Mock).mockReturnValue(true);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, otp },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(verifyOTP).toHaveBeenCalledWith(otp, user.OTP, user.TTL);
    expect(jsonMock).toHaveBeenCalledWith(
      {
        status: 200,
        data: true,
        success: true,
        error: null,
      } satisfies APIResponse<boolean | null>,
      { status: 200 }
    );
  });

  it("should return 200 and false if OTP is invalid", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
    (verifyOTP as jest.Mock).mockReturnValue(false);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, otp },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(verifyOTP).toHaveBeenCalledWith(otp, user.OTP, user.TTL);
    expect(jsonMock).toHaveBeenCalledWith(
      {
        status: 200,
        data: false,
        success: true,
        error: null,
      } satisfies APIResponse<boolean | null>,
      { status: 200 }
    );
  });

  it("should return 200 and null if user is not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, otp },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(verifyOTP).not.toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(
      {
        status: 200,
        data: null,
        success: true,
        error: null,
      } satisfies APIResponse<boolean | null>,
      { status: 200 }
    );
  });

  it("should return 500 if there is an error", async () => {
    const error = new Error("Database error");
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(error);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, otp },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(log).toHaveBeenCalledWith("api", error, "POST /api/otp");
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
