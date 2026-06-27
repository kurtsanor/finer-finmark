import type { NextFunction, Request, Response } from "express";
import * as productService from "./product.service.js";
import type { JwtClaims } from "../../shared/auth.types.js";

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

    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
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
  // retrive page number from request query
  const page = req.query.page || 1;
  let parsedPage;

  if (page) {
    parsedPage = Number(page);
  }

  if (!parsedPage || isNaN(parsedPage) || parsedPage < 1) {
    throw new Error(`Invalid page number: ${page}`);
  }
  try {
    const products = await productService.getAll(parsedPage);
    res
      .status(200)
      .json({ message: "All products fetched successfully", data: products });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a product by its ID.
 * @returns a JSON response with the updated product and a success message.
 */
export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as JwtClaims;
    const updatedProduct = await productService.updateById({
      ...req.body,
      userId: user.userId,
    });

    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a product by its ID.
 * @returns a JSON response with a success message upon successful deletion.
 */
export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract user information and product ID from the request
    const user = req.user as JwtClaims;

    // Ensure the product ID is a string
    const productId = req.params.id as string;

    // Call the service to delete the product
    await productService.deleteById(productId, user.userId);

    // Send a success response
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a product by its ID.
 * @returns a JSON response with the fetched product and a success message.
 */
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Ensure the product ID is a string
    const productId = req.params.id as string;

    // Call the service to get the product by ID
    const product = await productService.getById(productId);

    // Send a success response with the fetched product
    res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    next(error);
  }
};
