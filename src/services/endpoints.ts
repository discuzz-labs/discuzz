// Import the config
import config from "@/lib/config";

export type OtpCreateResponse = { otp: string };
export type OtpCreatePayload = { email: string };

export type OtpVerifyResponse = { verified: boolean | null };
export type OtpVerifyPayload = { otp: string; email: string };

const siteURL = config.site.url;

const endpoints = {
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
