import type { ReactNode } from "react";
import { useState } from "react";
import { logout as logoutRequest } from "../api/auth";
import { AuthContext, type AuthUser } from "./auth-context";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

function readStoredUser(): AuthUser | null {
  const rawUser = localStorage.getItem(USER_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

function clearStorage() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(ACCESS_TOKEN_KEY),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem(REFRESH_TOKEN_KEY),
  );
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  function login(tokens: { accessToken: string; refreshToken: string }, loggedUser: AuthUser) {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setUser(loggedUser);

    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
  }

  async function logout() {
    if (refreshToken) {
      try {
        await logoutRequest(refreshToken);
      } catch {
        // Ignore and clear local state anyway to avoid stale sessions.
      }
    }

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    clearStorage();
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        isLoggedIn: Boolean(accessToken),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
