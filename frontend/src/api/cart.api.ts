import type { CartItem } from "../types/cart.types";
import axiosInstance from "../utils/axiosInstance";

/**
 * Fetches the current user's cart.
 * @returns The user's cart, or an error if the request fails
 * @throws An error if the request fails
 */
export const getMyCart = async () => {
  try {
    const response = await axiosInstance.get("/api/carts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Adds an item to the current user's cart or updates the quantity if the item already exists.
 * @param data The item to add to the cart
 * @returns The updated cart, or an error if the request fails
 * @throws An error if the request fails
 */
export const upsertItemInCart = async (data: CartItem) => {
  try {
    const response = await axiosInstance.post("/api/carts", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Removes an item from the current user's cart.
 * @param productId The ID of the product to remove
 * @returns The updated cart, or an error if the request fails
 * @throws An error if the request fails
 */
export const removeItemFromCart = async (productId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/carts/items/${productId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
