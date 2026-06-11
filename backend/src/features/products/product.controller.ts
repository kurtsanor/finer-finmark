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
