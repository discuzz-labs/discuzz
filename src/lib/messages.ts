// StatusMessages.ts
export enum ERROR {
  API_IS_UNREACHABLE = "We cannot reach our API endpoint in the moment. Try again later.",
  REGISTERATION_FAILED_CANNOT_REACH_THE_DATABASE = "We cannot reach our database for now. Try again later.",
  REGISTERATION_FAILED_EMAIL_ALREADY_EXSITS = "Account with the same email found. Login!",
  REGISTERATION_FAILED_CONFIRM_EMAIL_CANNOT_BE_SEND = "We cannot send you the confirmation email. Try later.",
}

export enum SUCCESS {
  REGISTERATION_SUCCESS_ACCOUNT_CREATED = "Account created successfully.",
  REGISTERATION_SUCCESS_CONFIRMATION_EMAIL_SEND = "We send you the confirmation email. Check the spam folder too.",
}

export default function print(status: ERROR | SUCCESS): string {
  return status;
}
