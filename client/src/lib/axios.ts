import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const createAxiosInstance = (
  baseConfig: AxiosRequestConfig = {}
): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    ...baseConfig,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle unauthorized errors (token expired)
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Redirect to login or dispatch logout action
        window.location.href = "/auth/signin";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
