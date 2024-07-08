import config from "@/lib/config";

const siteURL = config.site.url;
const endpoints = {
  /**
   * tested : POSTMAN
   * POST: get user information by { email: string }
   */
  user: {
    get: { method: "POST", path: `${siteURL}/api/user` },
    create: { method: "PUT", path: `${siteURL}/api/user` },
  },
  email: {
    confirm: { method: "POST", path: `${siteURL}/api/email/confirm` },
  },
};

export default endpoints;
