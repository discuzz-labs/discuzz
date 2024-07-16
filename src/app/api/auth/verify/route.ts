import { type NextRequest, NextResponse } from "next/server";
import log from "@/lib/log";
import { type APIResponse } from "@/types/api";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        verified: true,
      },
    });

    return NextResponse.json(
      {
        status: 200,
        data: undefined,
        success: true,
        error: null,
      } satisfies APIResponse<undefined>,
      { status: 200 }
    );
  } catch (err) {
    log("api", err, `POST /api/auth/verify`);
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
