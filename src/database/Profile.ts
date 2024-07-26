import { Level, Role, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { DatabaseResponse } from "@/types/types";
import log from "@/lib/log";

// Define the ProfileConstructor interface
interface ProfileConstructor {
  email?: string;
  password?: string;
  name?: string;
  image?: string;
  id?: string;
  valuesToUpdate?: Partial<User>;
}

// Define an enum for ProfileError types
export enum ProfileErrorType {
  UserAlreadyExists = "UserAlreadyExists",
  ProfileCreationFailed = "ProfileCreationFailed",
  CannotFindProfile = "CannotFindProfile",
  CannotLoginWithProfile = "CannotLoginWithProfile",
  LoginFailed = "LoginFailed",
  UpdateProfileFailed = "UpdateProfileFailed",
  changePassword = "changePasswordFailed",
  InvalidArgs = "InvalidArgs",
}

// Define the Profile class
export default class Profile {
  public email: string | null;
  public password: string | null;
  public name: string | null;
  public id: string | null;
  public valuesToUpdate: Partial<User> | null;

  public image: string | null;
  constructor({
    email,
    password,
    name,
    image,
    id,
    valuesToUpdate,
  }: ProfileConstructor) {
    this.email = email ? email.trim().toLowerCase() : null;
    this.password = password ? password : null;
    this.name = name ? name : null;
    this.image = image ? image : null;
    this.id = id ? id : null;
    this.valuesToUpdate = valuesToUpdate ? valuesToUpdate : null;
  }

  async save(): Promise<DatabaseResponse<undefined | { id: string }>> {
    if (this.password && this.email && this.name && this.image) {
      let hashedPassword = bcrypt.hashSync(this.password, 10);
      try {
        const userResult = await this.findByEmail();
        if (userResult.data !== null) {
          return {
            success: false,
            data: undefined,
            error: { type: ProfileErrorType.UserAlreadyExists, origin: null },
          };
        }
        const createdUser = await prisma.user.create({
          data: {
            email: this.email,
            name: this.name,
            image: this.image,
            role: Role.USER,
            password: hashedPassword,
            badges: [],
            level: Level.BRONZE,
            verified: false,
            token: "",
            bio: "",
            links: []
          },
        });
        return {
          success: true,
          data: { id: createdUser.id },
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: undefined,
          error: { type: ProfileErrorType.ProfileCreationFailed, origin: err },
        };
      }
    } else {
      log("database", ProfileErrorType.InvalidArgs, "DATABASE profile.save");
      return {
        success: false,
        data: undefined,
        error: {
          type: ProfileErrorType.InvalidArgs,
          origin: ProfileErrorType.InvalidArgs,
        },
      };
    }
  }

  async findByEmail(): Promise<DatabaseResponse<undefined | User | null>> {
    if (this.email) {
      try {
        const user: User | null = await prisma.user.findUnique({
          where: {
            email: this.email,
          },
        });
        return {
          data: user,
          success: true,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: undefined,
          error: { type: ProfileErrorType.CannotFindProfile, origin: err },
        };
      }
    } else {
      log("database", ProfileErrorType.InvalidArgs, "DATABASE profile.findByEmail");
      return {
        success: false,
        data: undefined,
        error: {
          type: ProfileErrorType.InvalidArgs,
          origin: ProfileErrorType.InvalidArgs,
        },
      };
    }
  }

  async findById(): Promise<DatabaseResponse<undefined | User | null>> {
    if (this.id) {
      try {
        const user: User | null = await prisma.user.findUnique({
          where: {
            email: this.id,
          },
        });
        return {
          data: user,
          success: true,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: undefined,
          error: { type: ProfileErrorType.CannotFindProfile, origin: err },
        };
      }
    } else {
      log("database", ProfileErrorType.InvalidArgs, "DATABASE profile.findById");
      return {
        success: false,
        data: undefined,
        error: {
          type: ProfileErrorType.InvalidArgs,
          origin: ProfileErrorType.InvalidArgs,
        },
      };
    }
  }

  async login(): Promise<DatabaseResponse<undefined | User | null>> {
    if (this.password && this.email) {
      try {
        var passwordMatches = false;
        const user = await this.findByEmail();

        if (user && user.data) {
          passwordMatches = await bcrypt.compare(
            this.password,
            user.data.password as string
          );
        }

        return {
          data: passwordMatches ? user.data : undefined,
          success: passwordMatches ? true : false,
          error: passwordMatches
            ? null
            : {
                type: ProfileErrorType.CannotLoginWithProfile,
                origin: null,
              },
        };
      } catch (err) {
        return {
          success: false,
          data: undefined,
          error: { type: ProfileErrorType.LoginFailed, origin: err },
        };
      }
    } else {
      log("database", ProfileErrorType.InvalidArgs, "DATABASE profile.login");
      return {
        success: false,
        data: undefined,
        error: {
          type: ProfileErrorType.InvalidArgs,
          origin: ProfileErrorType.InvalidArgs,
        },
      };
    }
  }

  async updateProfileByEmail(): Promise<DatabaseResponse<undefined | User | null>> {
    if (this.valuesToUpdate &&  this.email) {
      try {
        const user = await prisma.user.update({
          where: { 
            email: this.email
          },
          data: this.valuesToUpdate,
        });
        return {
          success: true,
          data: user,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: undefined,
          error: { type: ProfileErrorType.UpdateProfileFailed, origin: err },
        };
      }
    } else {
      log("database", ProfileErrorType.InvalidArgs, "DATABASE profile.updateProfileByEmail");
      return {
        success: false,
        data: undefined,
        error: {
          type: ProfileErrorType.InvalidArgs,
          origin: ProfileErrorType.InvalidArgs,
        },
      };
    }
  }

  async updateProfileById(): Promise<DatabaseResponse<undefined | User | null>> {
    if (this.valuesToUpdate &&  this.id) {
      try {
        const user = await prisma.user.update({
          where: { 
            id: this.id
          },
          data: this.valuesToUpdate,
        });
        return {
          success: true,
          data: user,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: undefined,
          error: { type: ProfileErrorType.UpdateProfileFailed, origin: err },
        };
      }
    } else {
      log("database", ProfileErrorType.InvalidArgs, "DATABASE profile.updateProfileById");
      return {
        success: false,
        data: undefined,
        error: {
          type: ProfileErrorType.InvalidArgs,
          origin: ProfileErrorType.InvalidArgs,
        },
      };
    }
  }

  async changePassword(): Promise<DatabaseResponse<undefined>> {
    if (this.email && this.password) {
      try {
        let hashedPassword = bcrypt.hashSync(this.password, 10);
        const user = await prisma.user.update({
          where: { 
            email: this.email
          },
          data: {
            password: hashedPassword
          },
        });
        return {
          success: true,
          data: undefined,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          data: undefined,
          error: { type: ProfileErrorType.changePassword, origin: err },
        };
      }
    } else {
      log("database", ProfileErrorType.InvalidArgs, "DATABASE profile.changePassword");
      return {
        success: false,
        data: undefined,
        error: {
          type: ProfileErrorType.InvalidArgs,
          origin: ProfileErrorType.InvalidArgs,
        },
      };
    }
  }
}