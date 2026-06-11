import axios from "axios";

/*
 * Shared axios instance for all frontend network requests.
 * - `baseURL` is read from `import.meta.env.VITE_BACKEND_URL` with a
 *   sensible local fallback for development.
 * - `withCredentials: true` ensures cookies (e.g. session cookies)
 *   are sent with requests when the backend requires them.
 *
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  withCredentials: true,
});

export default axiosInstance;
