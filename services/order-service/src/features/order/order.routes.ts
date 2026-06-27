import express from "express";
import * as orderController from "./order.controller.js";
import {
  authenticate,
  authorizeRoles,
} from "../../middleware/auth.middleware.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import { createOrderSchema, updateOrderStatusSchema } from "./order.schema.js";

const router = express.Router();

// Buyer routes
router.post(
  "/",
  authenticate,
  validateRequest(createOrderSchema),
  orderController.createOrder,
);

router.get("/my-orders", authenticate, orderController.getBuyerOrders);

// Seller routes
router.get(
  "/seller",
  authenticate,
  authorizeRoles("merchant"),
  orderController.getSellerOrders,
);

router.patch(
  "/:orderId/status",
  authenticate,
  authorizeRoles("merchant"),
  validateRequest(updateOrderStatusSchema),
  orderController.updateOrderStatus,
);

export default router;
