import { type NextRequest, NextResponse } from "next/server";
// @ts-ignore
import { type APIResponse } from "@/types/api";
// @ts-ignore
import prisma from "@/lib/prisma";
// @ts-ignore
import log from "@/lib/log";
import bcrypt from "bcrypt";
import { createMocks } from "node-mocks-http";
// @ts-ignore
import { POST } from "@/app/api/auth/register/route"; // Adjust the import path

// Mock dependencies
jest.mock("@/lib/log");
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
    },
  },
}));
jest.mock("bcrypt");
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("POST /api/auth/register", () => {
  const email = "test@example.com";
  const fullName = "Test User";
  const imageURL = "http://example.com/image.jpg";
  const password = "testpassword";
  const hashedPassword =
    "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36HOh0aG0dCE2b2/g.5RE7S"; // Example hashed password

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and create a user if successful", async () => {
    (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedPassword);
    (prisma.user.create as jest.Mock).mockResolvedValue({});

    const { req, res } = createMocks({
      method: "POST",
      body: { email, fullName, imageURL, password },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(password, 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email,
        name: fullName,
        imageURL,
        age: 0,
        type: "user",
        password: hashedPassword,
        verified: false,
        TFA: false,
        OTP: "",
        TTL: "",
        bio: "",
        badges: [],
        likes: 0,
        links: [],
      },
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

  it("should return 500 if there is an error", async () => {
    const error = new Error("Database error");
    (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedPassword);
    (prisma.user.create as jest.Mock).mockRejectedValue(error);

    const { req, res } = createMocks({
      method: "POST",
      body: { email, fullName, imageURL, password },
    });

    // Add json method to req
    req.json = async () => req.body;

    const jsonMock = (NextResponse.json as jest.Mock).mockReturnValue(res);

    await POST(req as unknown as NextRequest);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(password, 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email,
        name: fullName,
        imageURL,
        age: 0,
        type: "user",
        password: hashedPassword,
        verified: false,
        TFA: false,
        OTP: "",
        TTL: "",
        bio: "",
        badges: [],
        likes: 0,
        links: [],
      },
    });
    expect(log).toHaveBeenCalledWith("api", error, "POST /api/auth/register");
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
