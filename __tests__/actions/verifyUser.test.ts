import verifyUser from '@/actions/verify/verifyUser';
import Profile, { ProfileErrorType } from '@/database/Profile';
import log from '@/lib/log';
import { ERROR } from '@/lib/messages';

// Mock dependencies
jest.mock('@/lib/log');
jest.mock("@/database/Profile");

describe('verifyUser', () => {
  const testUserId = 'test-user-id';

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should successfully verify user', async () => {
    // Arrange
    const updateProfileSpy = jest.spyOn(Profile.prototype, 'updateProfile').mockResolvedValueOnce({
      success: true,
      error: null,
      data: undefined,
    });

    // Act
    const result = await verifyUser({ id: testUserId });

    // Assert
    expect(updateProfileSpy).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.error).toBeNull();
    expect(result.data).toBeUndefined();
  });

  test('should return error if profile cannot be updated', async () => {
    // Arrange
    const updateProfileSpy = jest.spyOn(Profile.prototype, 'updateProfile').mockResolvedValueOnce({
      success: false,
      error: {
        type: ProfileErrorType.UpdateProfileFailed,
        origin: 'Database Error',
      },
      data: undefined,
    });

    // Act
    const result = await verifyUser({ id: testUserId });

    // Assert
    expect(updateProfileSpy).toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.VERIFICATION_FAILED_USER_CANNOT_BE_VERIFIED);
    expect(result.data).toBeUndefined();
  });

  test('should handle unexpected errors gracefully', async () => {
    // Arrange
    const updateProfileSpy = jest.spyOn(Profile.prototype, 'updateProfile').mockImplementationOnce(() => {
      throw new Error('Unexpected error');
    });

    // Act
    const result = await verifyUser({ id: testUserId });

    // Assert
    expect(updateProfileSpy).toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.SERVER_ERROR);
    expect(result.data).toBeUndefined();
    expect(log).toHaveBeenCalledWith("actions", new Error('Unexpected error'), "ACTIONS verify/verifyUser");
  });
});
