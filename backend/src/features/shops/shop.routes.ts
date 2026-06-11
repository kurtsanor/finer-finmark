import express from "express";
import * as shopController from "./shop.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new shop (requires authentication)
router.post("/", authenticate, shopController.create);

export default router;
