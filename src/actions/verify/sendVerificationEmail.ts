"use server";

import { ERROR } from "@/lib/messages";
import sendEmail from "@/services/sendEmail";
import type { ACTIONResponse } from "@/types/types";
import VerificationEmailTemplate, {
  subject,
} from "@/emailTemplate/VerificationEmail";

interface sendVerificationEmailProps {
  token: string;
  email: string;
  userName: string;
}

async function sendVerificationEmail({
  userName,
  email,
  token,
}: sendVerificationEmailProps): Promise<ACTIONResponse<undefined>> {
  try {
    await sendEmail({
      email,
      emailTemplate: VerificationEmailTemplate({
        token,
        userName,
      }),
      subject: subject,
    });

    return {
      error: null,
      success: true,
      data: undefined,
    };
  } catch (err) {
    return {
      error: ERROR.VERIFICATION_FAILED_EMAIL_CANNOT_BE_SENT,
      success: false,
      data: undefined,
    };
  }
}

export default sendVerificationEmail;
