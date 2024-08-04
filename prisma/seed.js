import { PrismaClient, Role, ReportType, PostStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const password = "Npmnpmnpmnpm123$";

async function main() {
  // Clear existing data
  await prisma.report.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  // Generate users
  const mainUserId = "66a677f2333d20b0a4610fb0";
  const userData = [
    {
      id: mainUserId,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: faker.date.past(),
      image: faker.image.avatar(),
      password: bcrypt.hashSync(password, 10),
      token: "",
      role: Role.USER,
      bio: faker.lorem.sentence(),
      verified: true,
      links: [faker.internet.url()],
      isBanned: faker.datatype.boolean(),
      isBannedUntil: faker.date.future(),
      points: faker.number.int({ min: 0, max: 40000 }),
    },
  ];

  for (let i = 0; i < 4; i++) {
    userData.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: faker.date.past(),
      image: faker.image.avatar(),
      password: bcrypt.hashSync(password, 10),
      token: "",
      role: Role.USER,
      bio: faker.lorem.sentence(),
      verified: true,
      links: [faker.internet.url()],
      isBanned: faker.datatype.boolean(),
      isBannedUntil: faker.date.future(),
      points: faker.number.int({ min: 0, max: 40000 }),
    });
  }

  // Create users in the database
  await prisma.user.createMany({
    data: userData,
  });

  // Get all created users
  const createdUsers = await prisma.user.findMany();

  // Generate posts
  const postsData = createdUsers.flatMap(user => {
    const numberOfPosts = faker.number.int({ min: 10, max: 50 });
    return Array.from({ length: numberOfPosts }).map(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      viewsNumber: faker.number.int({ min: 100, max: 1000 }),
      likes: faker.number.int({ min: 140, max: 2000 }),
      disLikes: faker.number.int({ min: 300, max: 500 }),
      authorId: user.id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      language: faker.location.state(),
      reason: faker.helpers.arrayElement(Object.values(ReportType)),
      status: faker.helpers.arrayElement(Object.values(PostStatus)),
    }));
  });

  // Create posts in the database
  await prisma.post.createMany({
    data: postsData,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
