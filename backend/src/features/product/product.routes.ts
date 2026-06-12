import express from "express";
import * as productController from "./product.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new product (requires authentication)
router.post("/", authenticate, productController.create);
router.get("/me", authenticate, productController.getOwnerProducts);
router.get("/", authenticate, productController.getAll);
router.get("/:id", authenticate, productController.getById);
router.patch("/:id", authenticate, productController.updateById);
router.delete("/:id", authenticate, productController.deleteById);

export default router;
