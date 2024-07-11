import { randomInt } from "crypto"

export const generateOTP = () : string => { return `${randomInt(100000, 999999)}`}

export const verifyOTP = (enteredOtpToken: string, otpToken: string, creationDate: string) : boolean => {
  const fiveMinutesAfterDateOfCreation = parseInt(creationDate, 10) + 5 * 60 * 1000
  const dateOfValidation = Date.now();
  if(otpToken !== enteredOtpToken) return false;
  if(dateOfValidation > fiveMinutesAfterDateOfCreation) return false;
  return true;
}
