import express from "express";
import { authenticate } from "../../middlewares/authMiddleware.js";
import * as orderController from "./order.controller.js";

const router = express.Router();

//Buyer routes
router.post("/", authenticate, orderController.createOrder);
router.get("/my-orders", authenticate, orderController.getBuyerOrders);


//Seller routes
router.get("/seller", authenticate, orderController.getSellerOrders);
router.patch("/:orderId/status", authenticate, orderController.updateOrderStatus);

export default router;

