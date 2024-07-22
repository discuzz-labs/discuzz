import signUpWithCred from '@/actions/sign-up/signUpWithCred';
import Profile, { ProfileErrorType } from '@/database/Profile';
import { ERROR } from '@/lib/messages';

jest.mock("@/database/Profile");

describe('signUpWithCred', () => {
  const testEmail = 'testuser@example.com';
  const testPassword = 'password123';
  const testImage = 'test.jpg';
  const testName = 'Test User';
  let createdUserId: string | undefined = undefined;

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should successfully register a new user', async () => {
    // Arrange
    const mockSaveResponse = {
      success: true,
      data: { id: 'test-user-id' },
      error: null,
    };

    // Mock Profile methods
    const mockSave = jest.spyOn(Profile.prototype, 'save').mockResolvedValueOnce(mockSaveResponse);

    // Act
    const result = await signUpWithCred({
      email: testEmail,
      password: testPassword,
      image: testImage,
      name: testName,
    });

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty('email', testEmail);
    expect(result.data).toHaveProperty('name', testName);
    expect(result.data).toHaveProperty('image', testImage);
    expect(result.data).toHaveProperty('verified', false);
    expect(result.data).toHaveProperty('id', 'test-user-id');
    expect(result.error).toBeNull();

    createdUserId = result.data?.id; // Capture the created user ID for cleanup
  });

  test('should return error if the email is already taken', async () => {
    // Arrange
    const mockErrorResponse = {
      success: false,
      error: {
        type: ProfileErrorType.UserAlreadyExists,
        origin: null,
      },
      data: undefined,
    };

    // Mock Profile methods
    const mockSave = jest.spyOn(Profile.prototype, 'save').mockResolvedValueOnce(mockErrorResponse);

    // Act
    const result = await signUpWithCred({
      email: testEmail,
      password: testPassword,
      image: testImage,
      name: testName,
    });

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.REGISTRATION_FAILED_EMAIL_ALREADY_EXISTS);
    expect(result.data).toBeUndefined();
  });

  test('should handle unexpected errors gracefully', async () => {
    // Arrange
    const mockUnexpectedError = new Error('Unexpected error');

    // Mock Profile methods
    const mockSave = jest.spyOn(Profile.prototype, 'save').mockImplementation(() => {
      throw mockUnexpectedError;
    });

    // Act
    const result = await signUpWithCred({
      email: testEmail,
      password: testPassword,
      image: testImage,
      name: testName,
    });

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.SERVER_ERROR);
    expect(result.data).toBeUndefined();
  });
});
