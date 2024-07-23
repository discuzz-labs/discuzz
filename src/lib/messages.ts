/**
 * Show message on an expected behavior
 */
export enum ERROR {
  SERVER_ERROR = "Server error 500. Try again later.",
  REGISTRATION_FAILED_EMAIL_ALREADY_EXISTS = "An account with this email already exists. Please log in.",

  VERIFICATION_FAILED_EMAIL_CANNOT_BE_SENT = "We cannot send you the verification email at the moment. Try again later.",
  VERIFICATION_FAILED_USER_CANNOT_BE_VERIFIED = "We cannot verify your account at the moment. Try again later.",
  
  RESETPASSWORD_FAILED_EMAIL_CANNOT_BE_SENT = "We cannot send you the reset password email at the moment. Try again later.",
  RESETPASSWOR_FAILED_TOKEN_CANNOT_BE_VERIFIED = "We cannot verify your Token at the moment. Try again later.",
  
  LOGIN_FAILED_WRONG_CREDENTIALS = "Invalid email or password. Please check your credentials and try again.",
  
  CALLBACK_ERROR = "An error occurred during the callback process. Please try again later.",

  IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_CREATED = "We cannot generate an identification token for your account at the moment. Try again later.",
  IDENTIFICATION_FAILED_TOKEN_INVALID = "Invalid identification token. Please check and try again.",
  IDENTIFICATION__FAILED_Token_CANNOT_BE_VERIFIED = "We cannot verify your identification token at the moment. Try again later.",
}

export enum SUCCESS {
  VERIFICATION_SUCCESS_EMAIL_SENT = "A verification email has been sent. Please check your inbox and spam folder.",
  VERIFICATION_SUCCESS_VERIFIED = "Email verified successfully.",
}

export enum PENDING {
  IDENTIFICATION_VERIFYING_TOKEN= "Verifying your identity.",
  VERIFICATION_VERIFYING_EMAIL= "Verifying your email.",
}