import type { NextFunction, Request, Response } from "express";
import * as productService from "./product.service.js";
import type { JwtClaims } from "../auth/auth.types.js";

/**
 * Create a new product.
 * @returns a JSON response with the created product and a success message.
 */
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract user information from the request
    const user = req.user as JwtClaims;

    // Call the service to create a new product
    const product = await productService.create({
      ...req.body,
      userId: user.userId,
    });

    // Send a success response with the created product
    res
      .status(201)
      .json({ message: "Product created successfully", data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all products of the shop that is owned by a specific user.
 * @returns a JSON response with the list of products and a success message.
 */
export const getOwnerProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as JwtClaims;
    const products = await productService.getOwnerProducts(user.userId);
    console.log("hey");

    res.json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all products.
 * @returns a JSON response with the list of all products and a success message.
 */
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await productService.getAll();
    res.json({ message: "All products fetched successfully", data: products });
  } catch (error) {
    next(error);
  }
};
