import log from "@/lib/log";
import sendEmail from "@/services/sendEmail";
import ConfirmEmailTemplate from "@/templates/confirmemail.email";
import { type APIResponse } from "@/types/api";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, otp } = await request.json();

  try {
    await sendEmail({
      email,
      emailTemplate: ConfirmEmailTemplate({ otp }),
      subject: "Confirmation Email",
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
    log("api", err, "POST /api/email/confirm");
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
