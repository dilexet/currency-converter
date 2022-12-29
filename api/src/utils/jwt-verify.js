import jwt from "jsonwebtoken";

const jwtVerify = (requestToken) => {
  const token = (requestToken || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};

export default jwtVerify;