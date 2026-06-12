import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductById } from "../api/product.api";

/**
 * Hook for deleting a product.
 * @returns a mutation object that can be used to trigger the delete product action and track its status.
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
