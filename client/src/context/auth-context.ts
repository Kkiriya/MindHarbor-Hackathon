import { createContext } from "react";

export type AuthUser = {
  userId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type AuthContextValue = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (tokens: { accessToken: string; refreshToken: string }, user: AuthUser) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
