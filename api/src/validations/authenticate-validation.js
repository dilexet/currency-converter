import { body } from "express-validator";

export const registerValidation = [
  body("name", "Name must be at least 2 characters").isLength({ min: 2 }),
  body("email", "Email is incorrect").isEmail(),
  body("password", "Name must be at least 4 characters").isLength({ min: 4 }),
];

export const loginValidation = [
  body("email", "Email is incorrect").isEmail(),
  body("password", "Enter your password").isLength({ min: 1 }),
];
