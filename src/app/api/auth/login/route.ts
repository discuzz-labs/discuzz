import { type NextRequest, NextResponse } from "next/server";
import { type APIResponse } from "@/types/api";
import prisma from "@/lib/prisma";
import { type User } from "@/types/database";
import log from "@/lib/log";
import bcrypt from "bcrypt";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

//finding user by email
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
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
      } satisfies APIResponse<typeof user>,
      { status: 200 }
    );
  } catch (err) {
    log("api", err, "POST /api/user/");
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
