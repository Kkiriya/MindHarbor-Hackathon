import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

type RefreshResponse = { data: { accessToken: string } };

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  timeout: 10_000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshing: Promise<RefreshResponse["data"]> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;
    const status = error.response?.status;
    const isAuthRoute =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register") ||
      originalRequest?.url?.includes("/auth/refresh");

    if (status !== 401 || !originalRequest || originalRequest._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshing ??= api
        .post<RefreshResponse>("/auth/refresh", { refreshToken })
        .then((response) => response.data.data);
      const response = await refreshing;
      refreshing = null;

      localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
      originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      refreshing = null;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return Promise.reject(refreshError);
    }
  },
);