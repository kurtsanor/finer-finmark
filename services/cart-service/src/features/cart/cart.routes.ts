import express from "express";
import * as cartController from "./cart.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Route to add an item to the cart (requires authentication)
router.post("/", authenticate, cartController.upsertItem);
// Route to get the user's cart (requires authentication)
router.get("/", authenticate, cartController.getUserCart);
// Route to remove an item from the cart (requires authentication)
router.delete("/items/:productId", authenticate, cartController.removeItem);
// Route to clear the user's cart (requires authentication)
router.delete("/", authenticate, cartController.clearCart);

export default router;
