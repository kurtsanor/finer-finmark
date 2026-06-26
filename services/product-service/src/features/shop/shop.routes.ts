import express from "express";
import * as shopController from "./shop.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Only sellers can create shops
router.post("/", authenticate, shopController.create);

export default router;
