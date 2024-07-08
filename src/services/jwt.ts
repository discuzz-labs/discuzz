var jwt = require("jsonwebtoken");

export const signToken = (payload: any) =>
  jwt.sign(payload, (process.env.AUTH_SECRET as string) || "");
export const verifyToken = (token: string) =>
  jwt.verifyToken(token, (process.env.AUTH_SECRET as string) || "");
