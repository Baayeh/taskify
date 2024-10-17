import { User } from "@/types/auth";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    sessionStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    sessionStorage.getItem("refresh_token")
  );

  const parsedUser = JSON.parse(sessionStorage.getItem("user") ?? "{}") as User;

  const [user, setUser] = useState<User | null>(parsedUser || null);

  const navigate = useNavigate();

  useEffect(() => {
    // Optionally, you can add a token verification logic by making a request to the backend
    if (accessToken) {
      // You might verify the token on component mount if needed
    }
  }, [accessToken]);

  const login = (accessToken: string, refreshToken: string, userData: User) => {
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
    sessionStorage.setItem("user", JSON.stringify(userData));

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user");

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    navigate("/login");
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
