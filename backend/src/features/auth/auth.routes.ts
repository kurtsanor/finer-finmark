import express from "express";
import * as authController from "./auth.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { signInSchema, signUpSchema } from "./auth.schema.js";

const router = express.Router();

router.post("/sign-up", validateRequest(signUpSchema), authController.signUp);
router.post("/sign-in", validateRequest(signInSchema), authController.signIn);
router.get("/me", authenticate, authController.getMe);
router.post("/logout", authController.signOut);

export default router;