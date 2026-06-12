import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductById } from "../api/product.api";

/**
 * Hook for updating a product by its ID.
 * @returns A mutation object that can be used to trigger the update action and track its status.
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
