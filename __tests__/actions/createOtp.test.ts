import createOtp from '@/actions/verify/createOtp';
import log from '@/lib/log';
import { ERROR } from '@/lib/messages';
import Profile, { ProfileErrorType } from '@/database/Profile';
import { generateOTP } from '@/services/otp';

// Mock dependencies
jest.mock('@/database/Profile');
jest.mock('@/services/otp');
jest.mock('@/lib/log');

describe('createOtp', () => {
  const testUserId = 'test-user-id';
  const testOtp = '123456';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should successfully generate and assign OTP', async () => {
    // Arrange
    (generateOTP as jest.Mock).mockReturnValue(testOtp)
    const mockUpdateProfileResponse = {
      success: true,
      error: null,
      data: undefined,
    };
    const mockUpdateProfile = jest.spyOn(Profile.prototype, 'updateProfile').mockResolvedValue(mockUpdateProfileResponse);

    // Act
    const result = await createOtp({ id: testUserId });

    // Assert
    expect(generateOTP).toHaveBeenCalled();
    expect(mockUpdateProfile).toHaveBeenCalledWith();
    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty('otp', testOtp);
    expect(result.error).toBeNull();
  });

  test('should return error if profile update fails', async () => {
    // Arrange
    (generateOTP as jest.Mock).mockReturnValue(testOtp)
    const mockUpdateProfileResponse = {
      success: false,
      error: {
        type: ProfileErrorType.UpdateProfileFailed,
        origin: 'Database Error',
      },
      data: undefined,
    };
    const mockUpdateProfile = jest.spyOn(Profile.prototype, 'updateProfile').mockResolvedValue(mockUpdateProfileResponse);

    // Act
    const result = await createOtp({ id: testUserId });

    // Assert
    expect(generateOTP).toHaveBeenCalled();
    expect(mockUpdateProfile).toHaveBeenCalledWith();
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.VERIFICATION_FAILED_OTP_CANNOT_BE_CREATED);
    expect(result.data).toBeUndefined();
  });

  test('should handle unexpected errors gracefully', async () => {
    // Arrange
    (generateOTP as jest.Mock).mockReturnValue(testOtp)
    const mockUpdateProfile = jest.spyOn(Profile.prototype, 'updateProfile').mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    // Act
    const result = await createOtp({ id: testUserId });

    // Assert
    expect(generateOTP).toHaveBeenCalled();
    expect(mockUpdateProfile).toHaveBeenCalledWith();
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.SERVER_ERROR);
    expect(result.data).toBeUndefined();
    expect(log).toHaveBeenCalledWith("actions", new Error('Unexpected error'), "ACTIONS verify/createOtp");
  });
});
