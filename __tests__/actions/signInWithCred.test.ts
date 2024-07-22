import signInWithCred from '@/actions/sign-in/signInWithCred';
import { ERROR } from '@/lib/messages';
import Profile, { ProfileErrorType } from '@/database/Profile';

jest.mock("@/database/Profile");

describe('signInWithCred', () => {
  const testEmail = 'testuser@example.com';
  const testPassword = 'password123';

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return success and user data for valid credentials', async () => {
    // Arrange
    const mockUser = {
      success: true,
      data: {
        id: 'test-user-id',
        email: testEmail,
        name: 'Test User',
        image: 'test.jpg',
        verified: false,
      },
      error: null,
    };

    // Mock Profile methods
    const mockLogin = jest.fn().mockResolvedValue(mockUser);
    jest.spyOn(Profile.prototype, 'login').mockImplementation(mockLogin);

    // Act
    const result = await signInWithCred({ email: testEmail, password: testPassword });

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty('email', testEmail);
    expect(result.data).toHaveProperty('name', 'Test User');
    expect(result.data).toHaveProperty('image', 'test.jpg');
    expect(result.data).toHaveProperty('verified', false);
    expect(result.data).toHaveProperty('id', 'test-user-id');
    expect(result.error).toBeNull();
  });

  test('should return error for incorrect password', async () => {
    // Arrange
    const mockErrorResponse = {
      success: false,
      error: {
        type: ProfileErrorType.CannotLoginWithProfile,
        origin: null,
      },
      data: undefined,
    };

    // Mock Profile methods
    const mockLogin = jest.fn().mockResolvedValue(mockErrorResponse);
    jest.spyOn(Profile.prototype, 'login').mockImplementation(mockLogin);

    // Act
    const result = await signInWithCred({ email: testEmail, password: 'wrongpassword' });

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.LOGIN_FAILED_WRONG_CREDENTIALS);
    expect(result.data).toBeUndefined();
  });

  test('should return error for non-existent email', async () => {
    // Arrange
    const mockErrorResponse = {
      success: false,
      error: {
        type: ProfileErrorType.CannotLoginWithProfile,
        origin: null,
      },
      data: undefined,
    };

    // Mock Profile methods
    const mockLogin = jest.fn().mockResolvedValue(mockErrorResponse);
    jest.spyOn(Profile.prototype, 'login').mockImplementation(mockLogin);

    // Act
    const result = await signInWithCred({ email: 'nonexistent@example.com', password: 'password123' });

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.LOGIN_FAILED_WRONG_CREDENTIALS);
    expect(result.data).toBeUndefined();
  });

  test('should handle unexpected errors gracefully', async () => {
    // Arrange
    const mockUnexpectedError = new Error('Unexpected error');

    // Mock Profile methods
    const mockLogin = jest.spyOn(Profile.prototype, 'login').mockImplementation(() => {
      throw mockUnexpectedError;
    });

    // Act
    const result = await signInWithCred({ email: testEmail, password: testPassword });

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe(ERROR.SERVER_ERROR);
    expect(result.data).toBeUndefined();
  });
});
