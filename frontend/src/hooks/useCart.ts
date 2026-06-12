import { useQuery } from "@tanstack/react-query";
import type { CartItemDto } from "../types/cart.types";
import { getMyCart } from "../api/cart.api";

/**
 * Hook for fetching the user's shopping cart.
 * @returns A query object containing the cart items, loading status, and error information.
 */
export const useCart = () => {
  return useQuery<CartItemDto[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await getMyCart();
      return response.data?.items ?? [];
    },
  });
};
