"use server";

import error from "@/services/error";
import sendEmail from "@/services/sendEmail";
import ResetPasswordEmailTemplate, {
  subject,
} from "@/emailTemplate/ResetPasswordEmail";

interface sendResetPasswordEmailArgs {
  email: string;
  userName: string;
  token: string;
}

async function sendResetPasswordEmail({
  userName,
  email,
  token,
}: sendResetPasswordEmailArgs): Promise<null> {
  try {
    await sendEmail({
      email,
      emailTemplate: ResetPasswordEmailTemplate({
        userName,
        token,
      }),
      subject: subject,
    });

    return null;
  } catch (err) {
    throw new Error(error("RESETPASSWORD_FAILED_EMAIL_CANNOT_BE_SENT"));
  }
}

export default sendResetPasswordEmail;
