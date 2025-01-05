import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../domains/auth/models/User";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (Date.now() < parsedUser.tokenExpiry) {
          setCurrentUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("authUser");
        }
      }
      setIsLoading(false); // Indica que la inicialización terminó
    };

    initializeAuth();
  }, []);

  const login = (user: User) => {
    const tokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hora
    const userWithExpiry = { ...user, tokenExpiry };
    localStorage.setItem("authUser", JSON.stringify(userWithExpiry));
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
