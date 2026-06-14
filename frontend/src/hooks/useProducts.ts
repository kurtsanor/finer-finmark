import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/product.api";
import type { PaginatedProductsResponse } from "../types/product.types";

/**
 * Hook for fetching all products.
 * @returns A query object containing the products, loading status, and error information.
 */
export const useProducts = (page: number) => {
  return useQuery<PaginatedProductsResponse>({
    queryKey: ["products", "all", page],
    queryFn: async () => {
      const response = await getAllProducts(page);
      return response;
    },
  });
};
