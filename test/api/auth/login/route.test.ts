import { type NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { type APIResponse } from "@/types/api";
// @ts-ignore
import prisma from "@/lib/prisma";
// @ts-ignore
import { type User } from "@/types/database";
// @ts-ignore
import log from "@/lib/log";
import bcrypt from "bcrypt";
import { createMocks } from "node-mocks-http";
// @ts-ignore
import { POST } from "@/app/api/auth/login/route";

// Mock dependencies
jest.mock("@/lib/log");
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));
jest.mock("bcrypt");
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/auth/login", () => {
  const email = "test@example.com";
  const password = "testpassword";
  const hashedPassword =
    "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36HOh0aG0dCE2b2/g.5RE7S"; // Example hashed password
  const user: Partial<User> = { id: 1, email, password: hashedPassword };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and user data if user is found and password matches", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, password },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
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

  it("should return 200 and null if user is not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, password },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(
      {
        status: 200,
        data: null,
        success: true,
        error: null,
      } satisfies APIResponse<null>,
      { status: 200 }
    );
  });

  it("should return 200 and null if password does not match", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, password },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(jsonMock).toHaveBeenCalledWith(
      {
        status: 200,
        data: null,
        success: true,
        error: null,
      } satisfies APIResponse<null>,
      { status: 200 }
    );
  });

  it("should return 500 if there is an error", async () => {
    const error = new Error("Database error");
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(error);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, password },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(log).toHaveBeenCalledWith("api", error, "POST /api/auth/login");
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
