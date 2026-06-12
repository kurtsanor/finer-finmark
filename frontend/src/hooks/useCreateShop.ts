import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShop } from "../api/shop.api";

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
