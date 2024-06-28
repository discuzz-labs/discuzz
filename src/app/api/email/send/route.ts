import config from "@/lib/config";
import log from "@/lib/log";
import { ERROR, SUCCESS } from "@/lib/messages";
import { type APIResponse } from "@/types/api";
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const { email, name, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: config.email.provider,
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: config.email.sender,
      pass: config.email.password,
    },
  });

  const mailOptions: Mail.Options = {
    from: config.email.sender,
    to: config.email.sender,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json(
      {
        message: ERROR.REGISTERATION_FAILED_CONFIRM_EMAIL_CANNOT_BE_SEND,
        status: 200,
        success: true,
      } satisfies APIResponse<undefined>,
      { status: 200 }
    );
  } catch (err) {
    log("api", err, "POST /api/email/send");
    return NextResponse.json(
      {
        error: err,
        message: SUCCESS.REGISTERATION_SUCCESS_CONFIRMATION_EMAIL_SEND,
        status: 500,
        success: false,
      } satisfies APIResponse<undefined>,
      { status: 500 }
    );
  }
}
