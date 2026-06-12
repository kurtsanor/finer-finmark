import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/product.api";

/**
 * Hook for creating a new product.
 * @returns a mutation object that can be used to trigger the create product action and track its status.
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
