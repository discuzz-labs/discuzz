import { type NextRequest, NextResponse } from "next/server";
import { type APIResponse } from "@/types/api";
import prisma from "@/lib/prisma";
import log from "@/lib/log";
import bcrypt from "bcrypt";
import { Role, Level } from "@prisma/client";
import { User } from "@/types/database";
import endpoints from "@/services/endpoints";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function POST(request: NextRequest) {
  const { email, fullName, imageURL, password } = await request.json();
  try {
    let hashedPassword = await bcrypt.hashSync(password, 10);
    const createdUser = await prisma.user.create({
      data: {
        email,
        fullName: fullName,
        imageURL,
        age: 0,
        role: Role.USER,
        password: hashedPassword,
        badges: [],
        level: Level.BRONZE,
        verified: false,
        TFA: false,
        OTP: "",
        TTL: "",
        bio: "",
        links: [],
        followerIds: [],
        followingIds: [],
      },
    });
    return NextResponse.json(
      {
        status: 200,
        success: true,
        data: { id: createdUser.id },
        error: null,
      } satisfies APIResponse<typeof endpoints.auth.register.responseType>,
      { status: 200 }
    );
  } catch (err) {
    log("api", err, "POST /api/auth/register");
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
