import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemFromCart } from "../api/cart.api";

/**
 * Hook for removing an item from the shopping cart.
 * @returns a mutation object that can be used to trigger the remove item action and track its status.
 */
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
