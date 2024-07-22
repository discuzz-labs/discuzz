import verifyOtp from '@/actions/verify/verifyOtp';
import Profile, { ProfileErrorType } from '@/database/Profile';
import log from '@/lib/log';
import { ERROR } from '@/lib/messages';
import { verifyOTP } from '@/services/otp';
import { User } from '@prisma/client';

// Mock dependencies
jest.mock('@/services/otp');
jest.mock('@/lib/log');
jest.mock("@/database/Profile");

describe('verifyOtp', () => {
  const testUserId = 'test-user-id';
  const testOtp = '123456';
  const validOtp = 'valid-otp';
  const testProfileData = {
    id: testUserId,
    OTP: validOtp,
    TTL: (Date.now() + 600000).toString(), // 1 minute TTL for testing
    verified: false,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should successfully verify OTP', async () => {
    // Arrange
    const findByIdSpy = jest.spyOn(Profile.prototype, 'findById').mockResolvedValueOnce({
      success: true,
      error: null,
      data: testProfileData as User,
    });
    (verifyOTP as jest.Mock).mockReturnValueOnce(true);

    // Act
    const result = await verifyOtp({ id: testUserId, otp: validOtp });

    // Assert
    expect(findByIdSpy).toHaveBeenCalled();
    expect(verifyOTP).toHaveBeenCalledWith(validOtp, testProfileData.OTP, testProfileData.TTL);
    expect(result.success).toBe(true);
    expect(result.error).toBeNull();
    expect(result.data).toBeUndefined();
  });

  test('should return error if profile is not found', async () => {
    // Arrange
    const findByIdSpy = jest.spyOn(Profile.prototype, 'findById').mockResolvedValueOnce({
      success: false,
      error: {
        type: ProfileErrorType.CannotFindProfile,
        origin: 'Database Error',
      },
      data: undefined,
    });

    // Act
    const result = await verifyOtp({ id: testUserId, otp: testOtp });

    // Assert
    expect(findByIdSpy).toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_VERIFIED);
    expect(result.data).toBeUndefined();
  });

  test('should return error if OTP is invalid', async () => {
    // Arrange
    const findByIdSpy = jest.spyOn(Profile.prototype, 'findById').mockResolvedValueOnce({
      success: true,
      error: null,
      data: testProfileData as User,
    });
    (verifyOTP as jest.Mock).mockReturnValueOnce(false);

    // Act
    const result = await verifyOtp({ id: testUserId, otp: testOtp });

    // Assert
    expect(findByIdSpy).toHaveBeenCalled();
    expect(verifyOTP).toHaveBeenCalledWith(testOtp, testProfileData.OTP, testProfileData.TTL);
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.VERIFICATION_FAILED_OTP_INVALID);
    expect(result.data).toBeUndefined();
  });

  test('should handle unexpected errors gracefully', async () => {
    // Arrange
    const findByIdSpy = jest.spyOn(Profile.prototype, 'findById').mockImplementationOnce(() => {
      throw new Error('Unexpected error');
    });

    // Act
    const result = await verifyOtp({ id: testUserId, otp: testOtp });

    // Assert
    expect(findByIdSpy).toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.SERVER_ERROR);
    expect(result.data).toBeUndefined();
    expect(log).toHaveBeenCalledWith("actions", new Error('Unexpected error'), "ACTIONS verify/verifyUser");
  });
});
