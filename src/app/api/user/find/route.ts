import { type NextRequest, NextResponse } from "next/server";
import { type APIResponse } from "@/types/api.";
import prisma from "@/lib/prisma";
import { type User } from "@/types/database.";
import log from "@/lib/log";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

//finding user by email
export async function POST(request: NextRequest) {
  const { email } = await request.json();
  try {
    const user: Partial<User> | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return NextResponse.json(
      {
        status: 200,
        data: user,
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
