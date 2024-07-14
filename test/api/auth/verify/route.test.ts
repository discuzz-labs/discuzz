import { type NextRequest, NextResponse } from "next/server";
// @ts-ignore
import log from "@/lib/log";
// @ts-ignore
import { type APIResponse } from "@/types/api";
// @ts-ignore
import prisma from "@/lib/prisma";
import { createMocks } from "node-mocks-http";
// @ts-ignore
import { POST } from "@/app/api/auth/verify/route"; // Adjust the import path

// Mock dependencies
jest.mock("@/lib/log");
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      update: jest.fn(),
    },
  },
}));
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/auth/verify", () => {
  const email = "test@example.com";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and update user verification status if successful", async () => {
    (prisma.user.update as jest.Mock).mockResolvedValue({});

    const { req, res } = createMocks({
      method: "POST",
      body: { email },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email },
      data: { verified: true },
    });
    expect(jsonMock).toHaveBeenCalledWith(
      {
        status: 200,
        data: undefined,
        success: true,
        error: null,
      } satisfies APIResponse<undefined>,
      { status: 200 }
    );
  });

  it("should return 500 if there is an error", async () => {
    const error = new Error("Database error");
    (prisma.user.update as jest.Mock).mockRejectedValue(error);

    const { req, res } = createMocks({
      method: "POST",
      body: { email },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email },
      data: { verified: true },
    });
    expect(log).toHaveBeenCalledWith("api", error, "POST /api/auth/verify");
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
