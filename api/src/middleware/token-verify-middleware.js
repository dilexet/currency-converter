import "dotenv/config";
import ApiError from "../error/api-error.js";
import jwtVerify from "../utils/jwt-verify.js";

const tokenVerifyMiddleware = (req, res, next) => {
  const decoded = jwtVerify(req.headers.authorization);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    return next(ApiError.unauthorized({ message: "You are unauthorized" }));
  }
};

export default tokenVerifyMiddleware;
