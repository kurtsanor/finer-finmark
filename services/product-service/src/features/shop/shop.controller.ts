import type { NextFunction, Request, Response } from "express";
import * as shopService from "./shop.service.js";
import type { JwtClaims } from "../../shared/auth.types.js";

/**
 * Create a new shop for the authenticated user.
 * @returns The created shop, or an error if the user already has a shop or if the request is invalid
 * @throws An error if the user already has a shop, if the request is invalid, or if the creation fails
 */
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract user information from the request
    const user = req.user as JwtClaims;

    // Prepare the payload for shop creation
    const payload = {
      ...req.body,
      userId: user.userId,
    };

    // Create the shop
    const shop = await shopService.create(payload);

    // Send the created shop as the response
    res.status(201).json({ message: "Shop created successfully", data: shop });
  } catch (error) {
    next(error);
  }
};

/**
 * Finds a shop by its ID.
 * @returns The shop associated with the specified shop ID, or an error if not found
 */
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const shopId = req.params.id as string;
    const shop = await shopService.findById(shopId);
    res.status(200).json({ message: "Shop found", data: shop });
  } catch (error) {
    next(error);
  }
};

/**
 * Finds a shop by the user ID.
 * @returns The shop associated with the specified user ID, or an error if not found
 */
export const findUserShop = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user as JwtClaims;
    const shop = await shopService.findByUserId(userId.userId);
    res.status(200).json({ message: "Shop found", data: shop });
  } catch (error) {
    next(error);
  }
};
