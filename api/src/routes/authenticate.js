import { Router } from "express";
import authenticationController from "../controllers/authentication-controller.js";
import { loginValidation, registerValidation } from "../validations/authenticate-validation.js";
import tokenVerify from "../utils/token-verify.js";

const router = new Router();

router.post("/login", loginValidation, authenticationController.login);
router.post("/registration", registerValidation, authenticationController.registration);
router.get("/profile", tokenVerify, authenticationController.profile);

export default router;