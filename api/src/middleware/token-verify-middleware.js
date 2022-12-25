import jwt from "jsonwebtoken";
import "dotenv/config";
import ApiError from "../error/api-error.js";

const tokenVerifyMiddleware = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userId = decoded.id;
      next();
    } catch (err) {
      return next(ApiError.forbiddenError({ message: "No access" }));
    }
  } else {
    return next(ApiError.forbiddenError({ message: "No access" }));
  }
};

export default tokenVerifyMiddleware;
