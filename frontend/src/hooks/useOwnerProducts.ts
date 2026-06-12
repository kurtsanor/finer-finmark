import { useQuery } from "@tanstack/react-query";
import { getOwnerProducts } from "../api/product.api";
import type { Product } from "../types/product.types";

export const useOwnerProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products", "owner"],
    queryFn: async () => {
      const response = await getOwnerProducts();
      return response.data;
    },
  });
};
