import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants/token.constants.js";
import ApiError from "../error/api-error.js";

const tokenVerify = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, TOKEN_SECRET);
      req.userId = decoded.id;
      next();
    } catch (err) {
      return next(ApiError.forbiddenError({ message: "No access" }));
    }
  } else {
    return next(ApiError.forbiddenError({ message: "No access" }));
  }
};

export default tokenVerify;
