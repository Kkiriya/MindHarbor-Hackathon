import {useState, useContext, createContext} from "react";
import * as React from "react";

type User = {
    firstName: string;
    lastName: string;
};

type AuthType = {
    token: string | null;
    user: User | null;
    isLoggedIn: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthType>(null as any);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token"),
    );
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    function login(newToken: string, loggedUser: User) {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        setToken(newToken);
        setUser(loggedUser);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isLoggedIn: Boolean(token),
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);
