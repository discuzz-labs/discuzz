"use server";

import { ERROR } from "@/lib/messages";
import sendEmail from "@/services/sendEmail";
import type { ACTIONResponse } from "@/types/types";
import ResetPasswordEmailTemplate, {subject} from "@/emailTemplate/ResetPasswordEmail";


interface sendResetPasswordEmailProps {
  email: string;
  userName: string;
  token: string;
}

async function sendResetPasswordEmail({
  userName,
  email,
  token
}: sendResetPasswordEmailProps): Promise<ACTIONResponse<undefined>> {
  try {
    await sendEmail({
      email,
      emailTemplate: ResetPasswordEmailTemplate({
        userName,
        token,
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
      error: ERROR.RESETPASSWORD_FAILED_EMAIL_CANNOT_BE_SENT,
      success: false,
      data: undefined,
    };
  }
}

export default sendResetPasswordEmail;
