import config from "@/lib/config";

const siteURL = config.site.url;

const endpoints = {
  user: {
    find: { method: "POST", path: `${siteURL}/api/user/find` },
    create: { method: "POST", path: `${siteURL}/api/user/create` },
    verify: { method: "POST", path: `${siteURL}/api/user/verify` },
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
