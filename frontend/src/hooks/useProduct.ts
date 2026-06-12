import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/product.api";
import type { Product } from "../types/product.types";

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await getProductById(id);
      return response.data;
    },
  });
};
