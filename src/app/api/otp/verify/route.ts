import { type NextRequest, NextResponse } from "next/server";
import { type APIResponse } from "@/types/api.";
import prisma from "@/lib/prisma";
import { type User } from "@/types/database.";
import log from "@/lib/log";
import { verifyOTP } from "@/services/otp";

// verify
export async function POST(request: NextRequest) {
  const { otp, email } = await request.json();

  try {
    const user: Partial<User> | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return NextResponse.json(
      {
        status: 200,
        data: user
          ? verifyOTP(otp, user.OTP as string, user.TTL as string)
          : null,
        success: true,
        error: null,
      } satisfies APIResponse<boolean | null>,
      { status: 200 }
    );
  } catch (err) {
    log("api", err, `POST /api/otp`);
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
