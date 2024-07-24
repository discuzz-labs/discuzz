/**
 * Show message on an expected behavior
 */
export enum ERROR {
  SERVER_ERROR = "Server error 500. Try again later.",

  REGISTRATION_FAILED_EMAIL_ALREADY_EXISTS = "An account with this email already exists. Please log in.",
  REGISTRATION_FAILED_PASSWORD_TOO_SMALL = "Password is too short. Please ensure it is 8 chars long.",
  REGISTRATION_FAILED_PASSWORD_TOO_BIG = "Password is too long. Please ensure it isnot more than 20 char long.",
  REGISTRATION_FAILED_PASSWORD_NEEDS_UPPERCASE_LETTER = "Password must contain at least one uppercase letter.",
  REGISTRATION_FAILED_PASSWORD_NEEDS_LOWERCASE_LETTER = "Password must contain at least one lowercase letter.",
  REGISTRATION_FAILED_PASSWORD_NEEDS_SPECIAL_CHAR = "Password must contain at least one special character.",
  REGISTRATION_FAILED_PASSWORD_NEEDS_NUMBER = "Password must contain at least one number.",
  REGISTRATION_FAILED_FULLNAME_TOO_SMALL = "Full name is too short. Please ensure it meets the minimum length requirement.",
  REGISTRATION_FAILED_EMAIL_INVALID = "The email address provided is invalid. Please enter a valid email address.",
  
  VERIFICATION_FAILED_EMAIL_CANNOT_BE_SENT = "We cannot send you the verification email at the moment. Try again later.",
  VERIFICATION_FAILED_USER_CANNOT_BE_VERIFIED = "We cannot verify your account at the moment. Try again later.",
  
  RESETPASSWORD_FAILED_EMAIL_CANNOT_BE_SENT = "We cannot send you the reset password email at the moment. Try again later.",
  RESETPASSWORD_FAILED_PASSWORD_CANNOT_BE_CHANGED = "We cannot reset your password at the moment. Try again later.",

  LOGIN_FAILED_WRONG_CREDENTIALS = "Invalid email or password. Please check your credentials and try again.",
  
  CALLBACK_ERROR = "An error occurred during the callback process. Please try again later.",

  IDENTIFICATION_FAILED_TOKEN_CANNOT_BE_CREATED = "We cannot generate an identification token for your account at the moment. Try again later.",
  IDENTIFICATION_FAILED_TOKEN_INVALID = "Invalid identification token. Please check and try again.",
  IDENTIFICATION__FAILED_Token_CANNOT_BE_VERIFIED = "We cannot verify your identification token at the moment. Try again later.",
}

export enum SUCCESS {
  VERIFICATION_SUCCESS_EMAIL_SENT = "A verification email has been sent. Please check your inbox and spam folder.",
  VERIFICATION_SUCCESS_VERIFIED = "Email verified successfully.",

  RESETPASSWORD_SUCCESS_EMAIL_SENT = "A reset password email has been sent. Please check your inbox and spam folder.",
}

export enum PENDING {
  VERIFICATION_VERIFYING_EMAIL= "Verifying your email.",
}