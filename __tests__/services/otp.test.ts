import { generateOTP, verifyOTP } from '@/services/otp'; // Adjust the import path as necessary

describe('generateOTP', () => {
  it('should generate a 6-digit OTP as a string', () => {
    const otp = generateOTP();
    expect(otp).toHaveLength(6);
    expect(parseInt(otp)).toBeGreaterThanOrEqual(100000);
    expect(parseInt(otp)).toBeLessThanOrEqual(999999);
  });
});

describe('verifyOTP', () => {
  const otpToken = '123456';
  const correctEnteredOtpToken = '123456';
  const incorrectEnteredOtpToken = '654321';
  const creationDate = `${Date.now()}`;
  const expiredCreationDate = `${Date.now() - 6 * 60 * 1000}`; // 6 minutes ago

  it('should return true for a correct OTP within 5 minutes', () => {
    const isValid = verifyOTP(correctEnteredOtpToken, otpToken, creationDate);
    expect(isValid).toBe(true);
  });

  it('should return false for an incorrect OTP', () => {
    const isValid = verifyOTP(incorrectEnteredOtpToken, otpToken, creationDate);
    expect(isValid).toBe(false);
  });

  it('should return false for an expired OTP', () => {
    const isValid = verifyOTP(correctEnteredOtpToken, otpToken, expiredCreationDate);
    expect(isValid).toBe(false);
  });

  it('should return false for a correct OTP but just expired', () => {
    const justExpiredCreationDate = `${Date.now() - 5 * 60 * 1000 - 1}`; // Just over 5 minutes ago
    const isValid = verifyOTP(correctEnteredOtpToken, otpToken, justExpiredCreationDate);
    expect(isValid).toBe(false);
  });

  it('should return true for a correct OTP just within the time limit', () => {
    const justWithinLimitCreationDate = `${Date.now() - 5 * 60 * 1000 + 1}`; // Just within 5 minutes
    const isValid = verifyOTP(correctEnteredOtpToken, otpToken, justWithinLimitCreationDate);
    expect(isValid).toBe(true);
  });
});
