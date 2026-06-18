import express from "express";
import {
  authenticate,
  authorizeRoles,
} from "../../middlewares/authMiddleware.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import * as orderController from "./order.controller.js";
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
