import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../api/auth.api";

/**
 * Hook for logging out the user.
 * @returns a mutation object that can be used to trigger the logout action and track its status.
 * On successful logout, the query cache is cleared to remove any user-specific data.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
