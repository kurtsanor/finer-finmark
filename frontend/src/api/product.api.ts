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
