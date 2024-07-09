var jwt = require("jsonwebtoken");

export const signToken = (payload: any) => {
  return jwt.sign(payload, (process.env.APP_KEY as string) || "secret");
};
export const verifyToken = (token: string) =>
  jwt.verify(token, (process.env.APP_KEY as string) || "secret");
