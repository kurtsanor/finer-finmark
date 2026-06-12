import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductById } from "../api/product.api";

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
