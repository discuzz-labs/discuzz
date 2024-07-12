import config from "@/lib/config";

const siteURL = config.site.url;

const endpoints = {
  user: {
    find: { method: "POST", path: `${siteURL}/api/user/find` },
  },
  auth: {
    verify: { method: "POST", path: `${siteURL}/api/auth/verify` },
    register: { method: "POST", path: `${siteURL}/api/auth/register` },
    login: { method: "POST", path: `${siteURL}/api/auth/login` },
  },
  otp: {
    create: { method: "POST", path: `${siteURL}/api/otp/create` },
    verify: { method: "POST", path: `${siteURL}/api/otp/verify` },
  },
  email: {
    confirm: { method: "POST", path: `${siteURL}/api/email/confirm` },
  },
};

export default endpoints;
