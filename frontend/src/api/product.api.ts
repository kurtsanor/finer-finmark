import type { CreateProductDto } from "../types/product.types";
import axiosInstance from "../utils/axiosInstance";

/**
 * Creates a new product.
 * @returns The created product, or an error if the request fails
 * @throws An error if the request fails
 */
export const createProduct = async (data: CreateProductDto) => {
  try {
    const response = await axiosInstance.post("/api/products", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches all products owned by the authenticated user.
 * @returns A list of products owned by the user, or an error if the request fails
 * @throws An error if the request fails
 */
export const getOwnerProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/products/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches all products.
 * @returns A list of all products, or an error if the request fails
 * @throws An error if the request fails
 */
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};
