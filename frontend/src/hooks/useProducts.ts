import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/product.api";
import type { Product } from "../types/product.types";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const response = await getAllProducts();
      return response.data;
    },
  });
};
