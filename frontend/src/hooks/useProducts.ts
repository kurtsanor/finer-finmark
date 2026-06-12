import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/product.api";
import type { Product } from "../types/product.types";

/**
 * Hook for fetching all products.
 * @returns A query object containing the products, loading status, and error information.
 */
export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const response = await getAllProducts();
      return response.data;
    },
  });
};
