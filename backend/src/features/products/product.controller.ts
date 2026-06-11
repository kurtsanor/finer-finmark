import type { NextFunction, Request, Response } from "express";
import * as productService from "./product.service.js";

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
    const product = await productService.create(req.body);
    res
      .status(201)
      .json({ message: "Product created successfully", data: product });
  } catch (error) {
    next(error);
  }
};
