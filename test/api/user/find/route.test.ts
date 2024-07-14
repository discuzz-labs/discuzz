import { type NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { type APIResponse } from "@/types/api.";
// @ts-ignore
import prisma from "@/lib/prisma";
// @ts-ignore
import { type User } from "@/types/database";
// @ts-ignore
import log from "@/lib/log";
// @ts-ignore
import { POST } from "@/app/api/user/find/route";
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
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/user", () => {
  const email = "test@example.com";
  const user: Partial<User> = { id: 1, email };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and user data if user is found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
    const { req, res } = createMocks({
      method: "POST",
      body: { email },
    });

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    req.json = async () => req.body;

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(jsonMock).toHaveBeenCalledWith(
      {
        status: 200,
        data: user,
        success: true,
        error: null,
      } satisfies APIResponse<typeof user>,
      { status: 200 }
    );
  });

  it("should return 500 if there is an error", async () => {
    const error = new Error("Database error");
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(error);
    const { req, res } = createMocks({
      method: "POST",
      body: { email },
    });

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);
    req.json = async () => req.body;

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(log).toHaveBeenCalledWith("api", error, "POST /api/user/");
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
