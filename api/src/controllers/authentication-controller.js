import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { Role, User } from "../models/user.js";
import jwtGenerate from "../utils/jwt-generate.js";
import ApiError from "../error/api-error.js";
import { Roles } from "../constants/roles.constants.js";

class AuthenticationController {
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors.array()));
      }

      const { email, password } = req.body;

      const userExist = await User.findOne({ where: { email } });
      const role = await Role.findOne({ where: { id: userExist.roleId } });
      if (!userExist) {
        return next(ApiError.badRequest({ message: "User is not found" }));
      }

      const isValidPassword = await bcrypt.compare(password, userExist.passwordHash);
      if (!isValidPassword) {
        return next(ApiError.badRequest({ message: "Login or Password is incorrect" }));
      }
      const token = jwtGenerate(userExist, role);
      if (token === null) {
        return next(ApiError.internalServerError({ message: "Token generation error" }));
      }
      return res.json({
        token,
      });
    } catch (err) {
      return next(ApiError.internalServerError({ message: err.message }));
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors.array()));
      }

      const { name, email, password } = req.body;

      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        return next(ApiError.badRequest({ message: "User with this email already exist" }));
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const [role] = await Role.findOrCreate({
        where: { name: Roles.User },
      });

      const user = await User.create({
        name,
        email,
        passwordHash,
        roleId: role.id,
      });

      const token = jwtGenerate(user, role);
      if (token === null) {
        return next(ApiError.internalServerError({ message: "Token generation error" }));
      }
      return res.json({ token });
    } catch (err) {
      return next(ApiError.internalServerError({ message: err.message }));
    }
  }

  async profile(req, res, next) {
    try {
      const user = await User.findOne({ where: { id: req.userId } });
      if (!user) {
        return next(ApiError.unauthorized({ message: "User is not found" }));
      }

      const { passwordHash, ...userData } = user.dataValues;
      return res.json({
        user: userData,
      });
    } catch (err) {
      return next(ApiError.internalServerError({ message: err.message }));
    }
  }
}

export default new AuthenticationController();