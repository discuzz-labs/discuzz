"use server";

import error from "@/services/error";
import sendEmail from "@/services/sendEmail";
import VerificationEmailTemplate, {
  subject,
} from "@/emailTemplate/VerificationEmail";

interface sendVerificationEmailArgs {
  token: string;
  email: string;
  userName: string;
}

async function sendVerificationEmail({
  userName,
  email,
  token,
}: sendVerificationEmailArgs): Promise<null> {
  try {
    await sendEmail({
      email,
      emailTemplate: VerificationEmailTemplate({
        token,
        userName,
      }),
      subject: subject,
    });

    return null;
  } catch (err) {
    throw new Error(error("VERIFICATION_FAILED_EMAIL_CANNOT_BE_SENT"));
  }
}

export default sendVerificationEmail;
