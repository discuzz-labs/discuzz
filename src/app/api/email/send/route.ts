import config from "@/lib/config";
import { APIResponse } from "@/types/api";
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
const log = require("log-to-file");

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
        message: "Email sent",
        status: 200,
        success: true,
      } satisfies APIResponse,
      { status: 200 }
    );
  } catch (err) {
    log(`POST /api/email/send - ${err}`, "logs/api.log");
    return NextResponse.json(
      {
        error: err,
        message: "Sending Email failed",
        status: 500,
        success: false,
      } satisfies APIResponse,
      { status: 500 }
    );
  }
}
