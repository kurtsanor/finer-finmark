import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShop } from "../api/shop.api";

/**
 * Hook for creating a new shop.
 * @returns a mutation object that can be used to trigger the create shop action and track its status.
 */
export const useCreateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createShop,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  });
};
