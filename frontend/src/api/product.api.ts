import type {
  CreateProductDto,
  UpdateProductDto,
} from "../types/product.types";
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

/**
 * Updates a product by its ID.
 * @param data The updated product data
 * @returns The updated product, or an error if the request fails
 * @throws An error if the request fails
 */
export const updateProductById = async (data: UpdateProductDto) => {
  try {
    const response = await axiosInstance.patch(
      `/api/products/${data._id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a product by its ID.
 * @param id The ID of the product to delete
 * @returns The response message from the delete request
 * @throws An error if the request fails
 */
export const deleteProductById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches a product by its ID.
 * @param id The ID of the product to fetch
 * @returns The product data, or an error if the request fails
 * @throws An error if the request fails
 */
export const getProductById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
