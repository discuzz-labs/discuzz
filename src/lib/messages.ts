/**
 * This messages only represent the messages the the app can trace.
 */
export enum ERROR {
  API_IS_UNREACHABLE = "We cannot reach our API endpoint in the moment. Try later.",
  REGISTERATION_FAILED_EMAIL_ALREADY_EXSITS = "Account with the same email found. Login!",

  VERIFICATION_FAILED_CONFIRM_EMAIL_CANNOT_BE_SEND = "We cannot send you the confirmation email. Try later.",
  VERIFICATION_FAILED_OTP_CANNOT_BE_CREATED = "We cannot assign your account an OTP. Try later.",
  VERIFICATION_FAILED_OTP_CANNOT_BE_VERIFIED = "We cannot verify your OTP. Try later.",
  VERIFICATION_FAILED_USER_BE_VERIFIED = "We cannot verify your account. Try later.",

  LOGIN_FAILED_WRONG_CREDENTIALS = "Invaild email or password.",
}

export enum SUCCESS {
  VERIFICATION_SUCCESS_CONFIRMATION_EMAIL_SEND = "We sended you a confirmation email. Check the spam folder too.",
}
