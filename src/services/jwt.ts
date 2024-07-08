var jwt = require("jsonwebtoken");

export const signToken = (payload: any) => {
  return jwt.sign(payload, (process.env.AUTH_SECRET as string) || "secret");
};
export const verifyToken = (token: string) =>
  jwt.verify(token, (process.env.AUTH_SECRET as string) || "secret");
