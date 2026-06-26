import express from "express";
import * as shopController from "./shop.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { shopSchema } from "./shop.schema.js";
import { validateRequest } from "../../middleware/validate.middleware.js";

const router = express.Router();

// Create a new shop
router.post(
  "/",
  authenticate,
  validateRequest(shopSchema),
  shopController.create,
);

export default router;
