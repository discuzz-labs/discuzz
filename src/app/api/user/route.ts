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
  const { email }: { email: string } = await request.json();
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

export async function PUT(request: NextRequest) {
  const { email, fullName, imageURL, password } = await request.json();
  try {
    let hashedPassword = await bcrypt.hashSync(password, 10);
    const user: Partial<User> | null = await prisma.user.create({
      data: {
        email,
        name: fullName,
        imageURL,
        age: 0,
        type: "user",
        password: hashedPassword,
        verified: false,
        TFA: false,
        bio: "",
        badges: [],
        likes: 0,
        links: [],
      },
    });
    return NextResponse.json(
      {
        status: 200,
        success: true,
        data: undefined,
        error: null,
      } satisfies APIResponse<undefined>,
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
