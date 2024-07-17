// Import the config
import config from "@/lib/config";
import { User } from "@/types/database";

// Define the response types
type UserFindResponse = Partial<User> | null;
type AuthVerifyResponse = undefined;
type AuthRegisterResponse = { id: string };
type AuthLoginResponse = Partial<User> | null;
type OtpCreateResponse = { otp: string };
type OtpVerifyResponse = { verified: boolean | null };

const siteURL = config.site.url;

const endpoints = {
  user: {
    find: {
      method: "POST",
      path: `${siteURL}/api/user/find`,
      responseType: {} as UserFindResponse,
    },
  },
  auth: {
    verify: {
      method: "POST",
      path: `${siteURL}/api/auth/verify`,
      responseType: undefined as AuthVerifyResponse,
    },
    register: {
      method: "POST",
      path: `${siteURL}/api/auth/register`,
      responseType: {} as AuthRegisterResponse,
    },
    login: {
      method: "POST",
      path: `${siteURL}/api/auth/login`,
      responseType: {} as AuthLoginResponse,
    },
  },
  otp: {
    create: {
      method: "POST",
      path: `${siteURL}/api/otp/create`,
      responseType: {} as OtpCreateResponse,
    },
    verify: {
      method: "POST",
      path: `${siteURL}/api/otp/verify`,
      responseType: {} as OtpVerifyResponse,
    },
  },
};

export default endpoints;
