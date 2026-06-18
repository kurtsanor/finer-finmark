import type { NextFunction, Request, Response } from "express";
import type { JwtClaims } from "../auth/auth.types.js";
import * as orderService from "./order.service.js";

/**
 * Create a new order.
 * @returns a JSON response with the created order and a success message.
 */

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as JwtClaims;
    const order = await orderService.createOrder(user.userId, req.body);
    res.status(201).json({ message: "Order placed successfully", data: order });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all orders for the authenticated user.
 * @returns a JSON response with the list of orders and a success message.
 */
export const getBuyerOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as JwtClaims;
    const orders = await orderService.getBuyerOrders(user.userId);
    res
      .status(200)
      .json({ message: "Orders retrieved successfully", data: orders });
  } catch (error) {
    next(error);
  }
};

export const getSellerOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as JwtClaims;
    const orders = await orderService.getSellerOrders(user.userId);
    res
      .status(200)
      .json({ message: "Orders retrieved successfully", data: orders });
  } catch (error) {
    next(error);
  }
};

/**
 * Update the fulfillment status of an order.
 * @returns a JSON response with the updated order and a success message.
 */

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as JwtClaims;
    const { orderId } = req.params;
    
    const updatedOrder = await orderService.updateOrderStatus(
      orderId as string,
      user.userId,
      req.body,
    );
    res.status(200).json({
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
