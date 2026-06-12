import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertItemInCart } from "../api/cart.api";

/**
 * Hook for setting the quantity of an item in the shopping cart.
 * @returns a mutation object that can be used to trigger the set item action and track its status.
 */
export const useSetCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertItemInCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
