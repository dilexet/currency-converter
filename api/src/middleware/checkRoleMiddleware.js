import ApiError from "../error/api-error.js";
import jwtVerify from "../utils/jwt-verify.js";
import { Role } from "../models/user.js";

const checkRoleMiddleware = (roleName) => {
  return (req, res, next) => {
    const decoded = jwtVerify(req.headers.authorization);
    if (decoded) {
      const role = Role.findOne({ where: { id: decoded?.roleId } });
      if (!role && role.name !== roleName) {
        return next(ApiError.forbiddenError({ message: "No access" }));
      }
      req.userId = decoded.id;
      next();
    } else {
      return next(ApiError.unauthorized({ message: "You are unauthorized" }));
    }
  };
};

export default checkRoleMiddleware;