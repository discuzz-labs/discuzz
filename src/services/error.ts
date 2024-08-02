import { ErrorCodes } from "@/types/types";

export default class AppError extends Error {
  code: ErrorCodes;

  constructor(code: ErrorCodes) {
    super(code);
    this.name = "AppExpectedError";
    this.code = code;
    // Maintain proper stack trace (only available in V8 engines like Chrome and Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}