"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { apiFetch } from "../services/api";

interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "moderator" | "player";

  firstName?: string;
  lastName?: string;
  nickname?: string;
  avatar?: string;
  isActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetches current authenticated session data securely from NestJS /auth/me
  const refreshUser = useCallback(async () => {
    try {
      const data = await apiFetch("/auth/me");
      setUser(data);
    } catch {
      setUser(null); // Clear state if token or session is invalid/expired
    } finally {
      setLoading(false);
    }
  }, []);

  // Gracefully clear server session and client identity state
  const logout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout request failed on server:", error);
    } finally {
      setUser(null);
      window.location.href = "/auth"; // Hard redirect to clear any residual layout states
    }
  };

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be executed within an explicit AuthProvider boundary",
    );
  }
  return context;
}
