import { type NextRequest, NextResponse } from "next/server";
import { type APIResponse } from "@/types/api";
import prisma from "@/lib/prisma";
import { type User } from "@/types/database";
import log from "@/lib/log";
import bcrypt from "bcrypt";
import type { AuthLoginPayload, AuthLoginResponse } from "@/services/endpoints";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

//finding user by email
export async function POST(request: NextRequest) {
  const { email, password }: AuthLoginPayload = await request.json();
  try {
    var passwordMatches = false;
    const user: Partial<User> | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      passwordMatches = await bcrypt.compare(
        password,
        user?.password as string
      );
    }
    return NextResponse.json(
      {
        status: 200,
        data: user && passwordMatches ? user : null,
        success: true,
        error: null,
      } satisfies APIResponse<AuthLoginResponse>,
      { status: 200 }
    );
  } catch (err) {
    log("api", err, "POST /api/auth/login");
    return NextResponse.json(
      {
        error: err,
        status: 500,
        success: false,
        data: undefined,
      } satisfies APIResponse<undefined>,
      { status: 500 }
    );
  }
}
