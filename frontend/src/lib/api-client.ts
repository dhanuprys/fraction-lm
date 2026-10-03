import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse } from "@/types/api";
import { config } from "@/config";

// Create a centralized Axios instance
export const apiClient = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Read the token directly from the Zustand store
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle Data Formatting and Global Errors
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Our backend wraps responses in a `successResponse` format.
    // If you only want the inner data payload, you can unwrap it here.
    // We return the full Axios response but typed to our backend schema.
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      // Optional: force redirect to login page (avoid if relying on react-router protected routes)
      // window.location.href = '/login';
    }

    // Extract the backend's explicit error message if available
    const backendMessage = error.response?.data?.message || error.message;

    // You can also plug in global toast notifications here
    console.error("API Error:", backendMessage);

    return Promise.reject(error);
  },
);

// Helper functions for strongly-typed requests
export const api = {
  get: <T>(url: string, config?: any) =>
    apiClient.get<ApiResponse<T>>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: any, config?: any) =>
    apiClient.post<ApiResponse<T>>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: any, config?: any) =>
    apiClient.put<ApiResponse<T>>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: any, config?: any) =>
    apiClient.patch<ApiResponse<T>>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: any) =>
    apiClient.delete<ApiResponse<T>>(url, config).then((res) => res.data),
};
