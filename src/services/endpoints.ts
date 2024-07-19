// Import the config
import config from "@/lib/config";
import { User } from "@/types/database";

// Define the response types
export type UserFindResponse = Partial<User> | null;
export type UserFindPayload = { email: string };

export type AuthVerifyResponse = undefined;
export type AuthVerifyPayload = { email: string };

export type AuthRegisterResponse = { id: string };
export type AuthRegisterPayload = {
  email: string;
  fullName: string;
  imageURL: string;
  password: string;
};

export type AuthLoginResponse = Partial<User> | null
export type AuthLoginPayload = { email: string; password: string };

export type OtpCreateResponse = { otp: string };
export type OtpCreatePayload = { email: string };

export type OtpVerifyResponse = { verified: boolean | null };
export type OtpVerifyPayload = { otp: string; email: string };

const siteURL = config.site.url;

const endpoints = {
  user: {
    find: {
      method: "POST",
      path: `${siteURL}/api/user/find`,
    },
  },
  auth: {
    verify: {
      method: "POST",
      path: `${siteURL}/api/auth/verify`,
    },
    register: {
      method: "POST",
      path: `${siteURL}/api/auth/register`,
    },
    login: {
      method: "POST",
      path: `${siteURL}/api/auth/login`,
    },
  },
  otp: {
    create: {
      method: "POST",
      path: `${siteURL}/api/otp/create`,
    },
    verify: {
      method: "POST",
      path: `${siteURL}/api/otp/verify`,
    },
  },
};

export default endpoints;
