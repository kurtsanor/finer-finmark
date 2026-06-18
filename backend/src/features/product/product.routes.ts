import express from "express";
import * as productController from "./product.controller.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("seller"), productController.create);
router.get("/me", authenticate, authorizeRoles("seller"), productController.getOwnerProducts);
router.get("/", authenticate, productController.getAll);
router.get("/:id", authenticate, productController.getById);
router.patch("/:id", authenticate, authorizeRoles("seller"), productController.updateById);
router.delete("/:id", authenticate, authorizeRoles("seller"), productController.deleteById);

export default router;