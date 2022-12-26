import { Router } from "express";
import authenticateRouter from "./authenticate.js";

const router = new Router();

router.use("/authenticate", authenticateRouter);

export default router;