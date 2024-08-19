import config from "@/config";
import log from "@/lib/log";
const jwt = require("jsonwebtoken");

function generatetoken(
  email: string,
  expirationDate: number
): {
  success: boolean;
  payload: {
    token: string;
  } | null;
} {
  try {
    var token = jwt.sign({ email }, config.appKey, {
      algorithm: "HS512",
      expiresIn: expirationDate,
    });
    return {
      success: true,
      payload: {
        token,
      },
    };
  } catch (err) {
    log("services", err, "SERVICES /token");
    return {
      success: false,
      payload: null,
    };
  }
}

function checktoken(token: string): {
  success: boolean;
  payload: {
    token: any
  } | null;
} {
  try {
    var decodedToken = jwt.verify(token, config.appKey, {
      algorithms: ["HS512"],
    });
    return {
      success: true,
      payload: {
        token: decodedToken
      },
    };
  } catch (err) {
    log("services", err, "SERVICES /token");
    return {
      success: false,
      payload: null,
    };
  }
}

export { generatetoken, checktoken };
