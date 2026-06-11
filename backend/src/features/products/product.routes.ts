import express from "express";
import * as productController from "./product.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new product (requires authentication)
router.post("/", authenticate, productController.create);

export default router;
