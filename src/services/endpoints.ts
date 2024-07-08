const endpoints = {
  /**
   * tested : POSTMAN
   * POST: get user information by { email: string }
   */
  user: {
    get: { method: "POST", path: "/api/user" },
    create: { method: "PUT", path: "/api/user" },
  },
  email: {
    confirm: { method: "POST", path: "/api/email/confirm" },
  },
};

export default endpoints;
