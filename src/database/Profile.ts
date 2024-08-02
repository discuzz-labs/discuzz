import { Follow, Prisma, Role, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { DatabaseResponse, UserWithCounts } from "@/types/types";

// Define the ProfileConstructor interface
interface ProfileConstructor {
  email?: string;
  password?: string;
  name?: string;
  image?: string;
  id?: string;
  valuesToUpdate?: Partial<User>;
}

// Define the ProfileConstructor interface
interface ProfileConstructor {
  email?: string;
  password?: string;
  name?: string;
  image?: string;
  id?: string;
  valuesToUpdate?: Partial<User>;
}

// Define the Profile class
export default class Profile {
  public email: string | null;
  public password: string | null;
  public name: string | null;
  public id: string | null;
  public valuesToUpdate: Partial<Prisma.UserUpdateInput> | null;

  public image: string | null;
  constructor({
    email,
    password,
    name,
    image,
    id,
    valuesToUpdate,
  }: ProfileConstructor) {
    this.email = email ? email : null;
    this.password = password ? password : null;
    this.name = name ? name : null;
    this.image = image ? image : null;
    this.id = id ? id : null;
    this.valuesToUpdate = valuesToUpdate ? valuesToUpdate : null;
  }

  public async save(): Promise<DatabaseResponse<{ id: string } | null>> {
    let hashedPassword = bcrypt.hashSync(this.password as string, 10);
    if ((await this.find()).data)
      return {
        success: false,
        data: null,
        error: null,
      };

    const createdUser = await prisma.user.create({
      data: {
        email: this.email as string,
        name: this.name as string,
        image: this.image as string,
        password: hashedPassword,
        verified: false,
        token: "",
        isBanned: false,
        isBannedUntil: new Date(),
        emailVerified: new Date(),
        role: Role.USER,
        bio: "",
        links: [],
        points: 10,
      },
    });
    return {
      success: true,
      data: { id: createdUser.id },
      error: null,
    };
  }

  public async saveOAuth(): Promise<DatabaseResponse<{ id: string }>> {
    const existingUser = await this.find();

    if (existingUser.data) {
      return {
        success: true,
        data: { id: existingUser.data.id },
        error: null,
      };
    }

    const createdUser = await prisma.user.create({
      data: {
        email: this.email as string,
        name: this.name as string,
        image: this.image as string,
        password: "", // OAuth users don't need a password
        verified: true, // Assuming OAuth users are verified by the provider
        token: "",
        isBannedUntil: new Date(),
        emailVerified: new Date(),
        bio: "",
        links: [],
      },
    });

    return {
      success: true,
      data: { id: createdUser.id },
      error: null,
    };
  }

  public async find(): Promise<DatabaseResponse<UserWithCounts | null>> {
    const where = this.email
      ? { email: this.email as string }
      : { id: this.id as string };
    const user: UserWithCounts | null = await prisma.user.findUnique({
      where: {
        ...where,
      },
      select: {
        email: true,
        image: true,
        name: true,
        verified: true,
        id: true,
        emailVerified: true,
        password: true,
        token: true,
        role: true,
        bio: true,
        links: true,
        points: true,
        isBanned: true,
        isBannedUntil: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    return {
      data: user,
      success: true,
      error: null,
    };
  }

  public async login(): Promise<DatabaseResponse<User | null>> {
    var passwordMatches = false;
    const user = await this.find();

    if (user && user.data) {
      passwordMatches = await bcrypt.compare(
        this.password as string,
        user.data.password as string
      );
    }

    return {
      data: passwordMatches ? user.data : null,
      success: passwordMatches ? true : false,
      error: null,
    };
  }

  public async updateProfile(): Promise<DatabaseResponse<User>> {
    const where = this.email
      ? { email: this.email as string }
      : { id: this.id as string };

    const user = await prisma.user.update({
      where,
      data: this.valuesToUpdate as Partial<Prisma.UserUpdateInput>,
    });
    return { success: true, data: user, error: null };
  }

  public async resetPassword(): Promise<DatabaseResponse> {
    let hashedPassword = bcrypt.hashSync(this.password as string, 10);
    await prisma.user.update({
      where: {
        email: this.email as string,
      },
      data: {
        password: hashedPassword,
      },
    });
    return {
      success: true,
      data: null,
      error: null,
    };
  }

  public async following(): Promise<DatabaseResponse<Partial<Follow>[]>> {
    const following = await prisma.follow.findMany({
      where: { followerId: this.id as string },
      select: { followingId: true },
    });
    return {
      success: true,
      data: following,
      error: null,
    };
  }

  public async followers(): Promise<DatabaseResponse<Partial<Follow>[]>> {
    const followers = await prisma.follow.findMany({
      where: { followerId: this.id as string },
      select: { followerId: true },
    });
    return {
      success: true,
      data: followers,
      error: null,
    };
  }

  public async isFollowing(followingId: string): Promise<boolean> {
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: this.id as string,
          followingId,
        },
      },
    });
  
    return !!existingFollow;
  }

  public async follow(followingId: string): Promise<DatabaseResponse<Follow>> {
      const newFollow = await prisma.follow.create({
        data: {
          followerId: this.id as string,
          followingId,
        },
      });
  
      return {
        success: true,
        data: newFollow,
        error: null,
      };
  }

  public async unfollow(followingId: string): Promise<DatabaseResponse<null>> {
    await prisma.follow.deleteMany({
      where: {
          followerId: this.id as string,
          followingId,
        },
      });
  
      return {
        success: true,
        data: null,
        error: null,
      };
  }
  
}
