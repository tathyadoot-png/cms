import axios from "axios";
import { handleApiError } from './errorHandler'

export const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

// 👇 Separate instance for refresh
const refreshApi = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // prevent infinite loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 👇 use refreshApi (NO interceptor)
        await refreshApi.post("/auth/refresh");

        return api(originalRequest);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);






api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error)
    return Promise.reject(error)
  },
)