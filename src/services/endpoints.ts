import config from "@/lib/config";

const siteURL = config.site.url;
const version = "v1";

const endpoints = {
  user: {
    get: { method: "POST", path: `${siteURL}/api/user` },
    create: { method: "PUT", path: `${siteURL}/api/user` },
    verify: { method: "POST", path: `${siteURL}/api/user/verify` },
  },
  otp: {
    create: { method: "PUT", path: `${siteURL}/api/otp` },
    verify: { method: "POST", path: `${siteURL}/api/otp` },
  },
  email: {
    confirm: { method: "POST", path: `${siteURL}/api/email/confirm` },
  },
};

export default endpoints;
