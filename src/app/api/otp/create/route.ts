import { type NextRequest, NextResponse } from "next/server";
import { type APIResponse } from "@/types/api";
import prisma from "@/lib/prisma";
import log from "@/lib/log";
import { generateOTP } from "@/services/otp";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    const otp = generateOTP();

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        OTP: otp,
        TTL: Date.now().toString(),
      },
    });

    return NextResponse.json(
      {
        status: 200,
        data: otp,
        success: true,
        error: null,
      } satisfies APIResponse<string>,
      { status: 200 }
    );
  } catch (err) {
    log("api", err, `PUT /api/otp`);
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
