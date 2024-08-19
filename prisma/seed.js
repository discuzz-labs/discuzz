import { PrismaClient, Role, ReportType, PostStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const password = "Npmnpmnpmnpm123$";

async function main() {
  // Clear existing data
  await prisma.report.deleteMany({});
  await prisma.postKeyword.deleteMany({});
  await prisma.keywords.deleteMany({});
  await prisma.category.deleteMany({});
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

  // Generate categories
  const categoryNames = ["Technology", "Science", "Health", "Business", "Art"];
  const categories = await prisma.category.createMany({
    data: categoryNames.map(name => ({
      name,
      description: faker.lorem.sentence(),
    })),
  });

  // Fetch all categories (since `createMany` doesn't return created records)
  const createdCategories = await prisma.category.findMany();

  // Generate keywords
  const keywordNames = ["AI", "COVID-19", "Blockchain", "Economy", "Art"];
  const keywords = await prisma.keywords.createMany({
    data: keywordNames.map(name => ({
      name,
    })),
  });

  // Fetch all keywords
  const createdKeywords = await prisma.keywords.findMany();

  // Generate posts
  const postsData = createdUsers.flatMap(user => {
    const numberOfPosts = faker.number.int({ min: 10, max: 50 });
    return Array.from({ length: numberOfPosts }).map(() => {
      // Randomly assign a category
      const randomCategory = faker.helpers.arrayElement(createdCategories);

      return {
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
        categoryId: randomCategory.id,
      };
    });
  });

  // Create posts in the database
  const createdPosts = await prisma.post.createMany({
    data: postsData,
  });

  // Fetch all created posts
  const allPosts = await prisma.post.findMany();

  // Assign random keywords to posts
  const postKeywordsData = allPosts.flatMap(post => {
    const randomKeywords = faker.helpers.arrayElements(createdKeywords, faker.number.int({ min: 1, max: 3 }));
    return randomKeywords.map(keyword => ({
      postId: post.id,
      keywordId: keyword.id,
    }));
  });

  // Create post-keyword associations
  await prisma.postKeyword.createMany({
    data: postKeywordsData,
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
