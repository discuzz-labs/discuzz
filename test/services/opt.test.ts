import { randomInt } from "crypto";
// @ts-ignore
import { generateOTP, verifyOTP } from "@/services/otp";

jest.mock("crypto", () => ({
  randomInt: jest.fn(),
}));

describe("OTP Functions", () => {
  describe("generateOTP", () => {
    it("should generate a 6-digit OTP", () => {
      (randomInt as jest.Mock).mockReturnValue(123456);

      const otp = generateOTP();

      expect(randomInt).toHaveBeenCalledWith(100000, 999999);
      expect(otp).toBe("123456");
    });
  });

  describe("verifyOTP", () => {
    const validOtp = "123456";
    const invalidOtp = "654321";
    const creationDate = Date.now().toString();

    it("should return true for a valid OTP within 5 minutes", () => {
      const result = verifyOTP(validOtp, validOtp, creationDate);

      expect(result).toBe(true);
    });

    it("should return false for an invalid OTP", () => {
      const result = verifyOTP(invalidOtp, validOtp, creationDate);

      expect(result).toBe(false);
    });

    it("should return false for an OTP that has expired", () => {
      const pastDate = (Date.now() - 10 * 60 * 1000).toString(); // 10 minutes ago

      const result = verifyOTP(validOtp, validOtp, pastDate);

      expect(result).toBe(false);
    });

    it("should return false for an OTP that is correct but created more than 5 minutes ago", () => {
      const pastDate = (Date.now() - 6 * 60 * 1000).toString(); // 6 minutes ago

      const result = verifyOTP(validOtp, validOtp, pastDate);

      expect(result).toBe(false);
    });
  });
});
