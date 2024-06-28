import { type NextRequest, NextResponse } from "next/server";
import { type APIResponse } from "@/types/api";
import prisma from "@/lib/prisma";
import { type User } from "@/types/database";
import log from "@/lib/log";

//finding user by email
export async function POST(request: NextRequest) {
  const { email }: { email: string } = await request.json();
  try {
    const user: Partial<User> | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return NextResponse.json(
      {
        message: "",
        status: 200,
        data: user,
        success: true,
      } satisfies APIResponse<typeof user>,
      { status: 200 }
    );
  } catch (err) {
    log("api", err, "POST /api/user/");
    return NextResponse.json(
      {
        error: err,
        message: "Failed to create your Account. SERVERERR 500",
        status: 500,
        success: false,
      } satisfies APIResponse<undefined>,
      { status: 500 }
    );
  }
}
