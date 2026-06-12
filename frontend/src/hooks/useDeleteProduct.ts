import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductById } from "../api/product.api";

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
