import { Router } from "express";
import authenticationController from "../controllers/authentication-controller.js";
import { loginValidation, registerValidation } from "../validations/authenticate-validation.js";
import tokenVerifyMiddleware from "../middleware/token-verify-middleware.js";

const router = new Router();

router.post("/login", loginValidation, authenticationController.login);
router.post("/registration", registerValidation, authenticationController.registration);
router.get("/profile", tokenVerifyMiddleware, authenticationController.profile);

export default router;