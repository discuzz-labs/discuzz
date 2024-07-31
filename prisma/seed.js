import { PrismaClient, Role, ReportType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const password = "Npmnpmnpmnpm123$";

async function main() {
  // Clear existing data
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.follow.deleteMany({}); // Clear existing follows

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
      points: faker.number.int({min: 0, max:40000})
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
    const numberOfPosts = faker.number.int({ min: 10, max: 50 }); // Each user will have 1 to 5 posts
    return Array.from({ length: numberOfPosts }).map(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      viewsNumber: faker.number.int({ min: 100, max: 1000}),
      likes: faker.number.int({ min: 140, max: 2000}),
      disLikes: faker.number.int({ min: 300, max: 500}),
      authorId: user.id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      isRestricted: faker.datatype.boolean(),
      language: faker.location.state(),
      reason: faker.helpers.arrayElement(Object.values(ReportType))
    }));
  });

  // Create posts in the database
  await prisma.post.createMany({
    data: postsData,
  });

  // Get all created posts
  const createdPosts = await prisma.post.findMany();

  // Generate comments
  const commentsData = createdPosts.flatMap(post => {
    const numberOfComments = faker.number.int({ min: 1, max: 10 }); // Each post will have 1 to 10 comments
    return Array.from({ length: numberOfComments }).map(() => ({
      content: faker.lorem.sentences(2),
      authorId: createdUsers[faker.number.int({ min: 0, max: createdUsers.length - 1 })].id,
      postId: post.id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }));
  });

  // Create comments in the database
  await prisma.comment.createMany({
    data: commentsData,
  });

  // Generate follows
  const followsData = createdUsers.flatMap(follower => {
    // Each user will follow 1 to 3 other users
    const numberOfFollows = faker.number.int({ min: 1, max: 3 });
    const followingIds = faker.helpers.uniqueArray(
      () => createdUsers[faker.number.int({ min: 0, max: createdUsers.length - 1 })].id,
      numberOfFollows
    );

    return followingIds.map(followingId => ({
      followerId: follower.id,
      followingId: followingId,
    }));
  });

  // Create follows in the database
  await prisma.follow.createMany({
    data: followsData,
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
