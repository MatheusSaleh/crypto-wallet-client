import { api } from "./api";
import type { AuthTokens, User } from "../types/user";

interface Credentials {
  email: string;
  password: string;
}

export async function login(credentials: Credentials) {
  const { data } = await api.post<AuthTokens>("/auth/login", credentials);
  return data;
}

export async function register(credentials: Credentials) {
  const { data } = await api.post<AuthTokens>("/auth/register", credentials);
  return data;
}

export async function getMe() {
  const { data } = await api.get<User>("/users/me");
  return data;
}
