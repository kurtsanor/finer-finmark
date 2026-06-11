import axiosInstance from "../utils/axiosInstance";

/**
 * Fetches the current authenticated user's information from the backend.
 * @returns The authenticated user's information, or an error if the user is not authenticated
 * @throws An error if the request fails or if the user is not authenticated
 */
export const getMe = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Signs the current user out of the application.
 * @returns A success message if the user is signed out successfully, or an error if the request fails
 * @throws An error if the request fails
 */
export const signOut = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};
