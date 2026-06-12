import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/product.api";
import type { Product } from "../types/product.types";

/**
 * Hook for fetching a product by its ID.
 * @param id The ID of the product to fetch.
 * @returns A query object containing the product data, loading status, and error information.
 */
export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await getProductById(id);
      return response.data;
    },
  });
};
