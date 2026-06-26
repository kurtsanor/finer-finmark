import express from "express";
import * as shopController from "./shop.controller.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/auth.middleware.js";

const router = express.Router();

// Only sellers can create shops
router.post(
  "/",
  authenticate,
  authorizeRoles("merchant"),
  shopController.create,
);

export default router;
