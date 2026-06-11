import type { CreateShopDto } from "../types/shop.types";
import axiosInstance from "../utils/axiosInstance";

/**
 * Creates a new shop.
 * @returns The created shop, or an error if the request fails
 * @throws An error if the request fails
 */
export const createShop = async (data: CreateShopDto) => {
  try {
    const response = await axiosInstance.post("/api/shops", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
