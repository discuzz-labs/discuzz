import type { User } from "@/types/database";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (userData: User) => {
  await prisma.user.create({
    data: {
      email: "elsa@prisma.io",
      name: "Elsa Prisma",
    },
  });
};
