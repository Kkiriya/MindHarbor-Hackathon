import { api } from "./axios";
import type { AuthUser } from "../context/auth-context";

type ApiData<T> = { data: T };

type LoginResponse = {
  user: AuthUser;
  accesToken: string;
  refreshToken: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export async function register(payload: RegisterPayload): Promise<void> {
  await api.post("/auth/register", payload);
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<ApiData<LoginResponse>>("/auth/login", payload);
  return response.data.data;
}

export async function logout(refreshToken: string): Promise<void> {
  await api.post("/auth/logout", { refreshToken });
}
