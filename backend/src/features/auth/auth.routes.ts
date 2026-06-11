import express from "express";
import * as authController from "./auth.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.get("/me", authenticate, authController.getMe);
router.post("/logout", authController.signOut);

export default router;
