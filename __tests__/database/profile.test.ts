import { PrismaClient  } from '@prisma/client';
import Profile, { ProfileErrorType } from '@/database/Profile';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

describe('Profile Class', () => {
  let profile: Profile;
  const testEmail = 'testuser@example.com';
  const testPassword = 'password123';
  const testName = 'Test User';
  const testImage = 'test.jpg';
  let createdUserId: string | null = null;

  beforeAll(async ()=> {
    await prisma.$connect();
    await prisma.user.delete({ where: { email: testEmail } });
  })

  beforeEach(() => {
    profile = new Profile({
      email: testEmail,
      password: testPassword,
      name: testName,
      image: testImage,
    });
  });

  afterAll(async () => {
    // Clean up test user
    if (createdUserId) {
      await prisma.user.delete({ where: { id: createdUserId } });
    }
    await prisma.$disconnect();
  });

  test('should save a new profile successfully', async () => {
    profile.email = testEmail;
    profile.password = testPassword
    profile.image = testImage;
    profile.name = testName;
    const result = await profile.save();

    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty('id');
    createdUserId = result.data?.id || null;
  });
  
  test('should not save a profile if user already exists', async () => {
    profile.email = testEmail;
    profile.password = testPassword
    profile.image = testImage;
    profile.name = testName;
    const result = await profile.save();
    
    expect(result.success).toBe(false);
    expect(result.error?.type).toBe(ProfileErrorType.UserAlreadyExists);
  });
  
  test('should find a user by email', async () => {
    profile.email = testEmail;
    const result = await profile.findByEmail()

    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty('email', testEmail);
  });

  test('should return an error if email is not provided', async () => {
    profile.email = null;

    const result = await profile.findByEmail();

    expect(result.success).toBe(false);
    expect(result.error?.type).toBe(ProfileErrorType.InvalidArgs);
  });

  test('should login successfully with correct credentials', async () => {
    profile.email = testEmail
    profile.password = testPassword

    const result = await profile.login();

    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty('email', testEmail);
  });

  test('should not login with incorrect credentials', async () => {
    profile.password = 'wrongpassword';
    profile.email = testEmail
    const result = await profile.login();

    expect(result.success).toBe(false);
    expect(result.error?.type).toBe(ProfileErrorType.CannotLoginWithProfile);
  });

  test('should update a user profile successfully', async () => {
    profile.valuesToUpdate = { name: 'Updated Name' };
    profile.id = createdUserId;

    const result = await profile.updateProfile();

    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty('name', 'Updated Name');
  });

  test('should not update profile if no values provided', async () => {
    profile.valuesToUpdate = null;

    const result = await profile.updateProfile();

    expect(result.success).toBe(false);
    expect(result.error?.type).toBe(ProfileErrorType.InvalidArgs);
  });
});
