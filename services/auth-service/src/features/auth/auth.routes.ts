import express from "express";
import * as authController from "./auth.controller.js";
import {
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "./auth.schema.js";
import authenticate from "../../middleware/auth.middleware.js";
import { validateRequest } from "../../middleware/validate.middleware.js";

const router = express.Router();

router.post("/sign-up", validateRequest(signUpSchema), authController.signUp);
router.post("/sign-in", validateRequest(signInSchema), authController.signIn);
router.get("/me", authenticate, authController.getMe);
router.post("/logout", authController.signOut);
router.post(
  "/reset-password",
  (req, res, next) => {
    console.log("HIT reset-password", req.body);
    next();
  },
  validateRequest(resetPasswordSchema),
  authController.resetPassword,
);
router.get("/users/:id", authController.getUserById);
router.patch("/users", authController.updateUserRole);

export default router;
