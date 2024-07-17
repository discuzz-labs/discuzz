import { signToken, verifyToken } from "@/services/jwt";
import jwt from "jsonwebtoken";
jest.mock("jsonwebtoken");

describe("JWT Token Functions", () => {
  const payload = { id: 1, username: "testuser" };
  const secret = "secret";
  const token = "signed-token";
  const invalidToken = "invalid-token";
  const wrongSecret = "wrong-secret";

  beforeEach(() => {
    process.env.APP_KEY = secret;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signToken", () => {
    it("should sign a token with the given payload", () => {
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = signToken(payload);

      expect(jwt.sign).toHaveBeenCalledWith(payload, secret);
      expect(result).toBe(token);
    });

    it("should sign a token with the given payload and default secret", () => {
      delete process.env.APP_KEY;
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = signToken(payload);

      expect(jwt.sign).toHaveBeenCalledWith(payload, "secret");
      expect(result).toBe(token);
    });
  });

  describe("verifyToken", () => {
    it("should verify a token and return the decoded payload", () => {
      (jwt.verify as jest.Mock).mockReturnValue(payload);

      const result = verifyToken(token);

      expect(jwt.verify).toHaveBeenCalledWith(token, secret);
      expect(result).toBe(payload);
    });

    it("should not verify an invalid token", () => {
      (jwt.verify as jest.Mock).mockReturnValue(payload);

      const result = verifyToken(token);

      expect(jwt.verify).toHaveBeenCalledWith(token, secret);
      expect(result).toBe(payload);
    });

    it("should verify a token and return the decoded payload with default secret", () => {
      delete process.env.APP_KEY;
      (jwt.verify as jest.Mock).mockReturnValue(payload);

      const result = verifyToken(token);

      expect(jwt.verify).toHaveBeenCalledWith(token, "secret");
      expect(result).toBe(payload);
    });

    it("should not verify an invalid token", () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("invalid token");
      });

      expect(() => verifyToken(invalidToken)).toThrow("invalid token");
      expect(jwt.verify).toHaveBeenCalledWith(invalidToken, secret);
    });

    it("should not verify a token with a wrong secret", () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("invalid signature");
      });

      process.env.APP_KEY = wrongSecret;

      expect(() => verifyToken(token)).toThrow("invalid signature");
      expect(jwt.verify).toHaveBeenCalledWith(token, wrongSecret);
    });
  });
});
