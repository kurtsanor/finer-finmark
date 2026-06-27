import type { NextFunction, Request, Response } from "express";
import * as cartService from "./cart.service.js";
import type { JwtClaims } from "../../shared/auth.types.js";

/**
 * Adds an item to the user's cart
 * @returns The updated cart and a success message
 */
export const upsertItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const user = req.user as JwtClaims;

    const updatedCart = await cartService.upsertItem(user.userId, data);
    res.status(200).json({ message: "Item added to cart", data: updatedCart });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetches the cart for the specified user
 * @returns The user's cart or null if not found
 */
export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as JwtClaims;
    const cart = await cartService.getUserCart(user.userId);
    res.status(200).json({ message: "Cart fetched successfully", data: cart });
  } catch (error) {
    next(error);
  }
};

/**
 * Removes an item from the user's cart
 * @returns The updated cart and a success message after removing the item
 */
export const removeItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract user and productId from the request
    const user = req.user as JwtClaims;
    const productId = req.params.productId as string;

    // Remove the item from the cart and get the updated cart
    const updatedCart = await cartService.removeItem(user.userId, productId);
    res
      .status(200)
      .json({ message: "Item removed from cart", data: updatedCart });
  } catch (error) {
    next(error);
  }
};

/**
 * Clears all items from the user's cart
 * @returns The updated cart and a success message after clearing the cart
 */
export const clearCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as JwtClaims;
    const updatedCart = await cartService.clearCart(user.userId);
    res
      .status(200)
      .json({ message: "Cart cleared successfully", data: updatedCart });
  } catch (error) {
    next(error);
  }
};
