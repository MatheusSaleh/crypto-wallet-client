import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as authService from "../services/authService";
import { tokenStorage } from "../services/tokenStorage";
import { SESSION_EXPIRED_EVENT } from "../services/api";
import type { User } from "../types/user";

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!tokenStorage.getAccessToken(),
  );

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["me"],
    queryFn: authService.getMe,
    enabled: isAuthenticated,
    staleTime: Infinity,
  });

  const logout = useCallback(() => {
    tokenStorage.clear();
    queryClient.clear();
    setIsAuthenticated(false);
  }, [queryClient]);

  // Sessão expirada (refresh falhou) → volta para o login
  useEffect(() => {
    window.addEventListener(SESSION_EXPIRED_EVENT, logout);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, logout);
  }, [logout]);

  async function login(credentials: Credentials) {
    tokenStorage.set(await authService.login(credentials));
    setIsAuthenticated(true);
  }

  async function register(credentials: Credentials) {
    tokenStorage.set(await authService.register(credentials));
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoadingUser, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
