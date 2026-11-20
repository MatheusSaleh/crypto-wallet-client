import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "./tokenStorage";
import type { AuthTokens } from "../types/user";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

/** Disparado quando a sessão expira e não é possível renová-la. */
export const SESSION_EXPIRED_EVENT = "cw:session-expired";

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Garante um único refresh em andamento mesmo com várias requisições 401 simultâneas
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) throw new Error("Sem refresh token");

  // Usa axios puro para não passar pelos interceptors
  const { data } = await axios.post<AuthTokens>(`${API_URL}/auth/refresh`, {
    refreshToken,
  });
  tokenStorage.set(data);
  return data.accessToken;
}

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetriableConfig | undefined;
    const isAuthRoute = original?.url?.startsWith("/auth/");

    if (error.response?.status === 401 && original && !original._retry && !isAuthRoute) {
      original._retry = true;
      try {
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
        const newToken = await refreshPromise;
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        tokenStorage.clear();
        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
      }
    }

    return Promise.reject(error);
  },
);

/** Extrai uma mensagem amigável de erros da API (formato padrão do NestJS). */
export function getErrorMessage(error: unknown, fallback = "Erro inesperado"): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "Não foi possível conectar ao servidor.";
    const message = (error.response.data as { message?: string | string[] })?.message;
    if (Array.isArray(message)) return message.join(", ");
    if (message) return message;
    return `${fallback} (HTTP ${error.response.status})`;
  }
  return error instanceof Error ? error.message : fallback;
}
