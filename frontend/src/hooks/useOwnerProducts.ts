import { useQuery } from "@tanstack/react-query";
import { getOwnerProducts } from "../api/product.api";
import type { Product } from "../types/product.types";

/**
 * Hook for fetching products owned by the current user.
 * @returns a query object that contains the owner's products, loading status, and error information.
 */
export const useOwnerProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products", "owner"],
    queryFn: async () => {
      const response = await getOwnerProducts();
      return response.data;
    },
  });
};
