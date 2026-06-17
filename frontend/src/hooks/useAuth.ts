import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.api";
import type { User } from "../types/auth.types";

/**
 * Hook for fetching authenticated user information.
 * @returns a query object that contains the authenticated user's data, loading status, and error information.
 */
const useAuth = () => {
  return useQuery<User>({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await getMe();
      // console.log("User: ", response.data);

      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useAuth;
