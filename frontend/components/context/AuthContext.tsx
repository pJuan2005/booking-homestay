"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { users } from "@/lib/mockData";
import type { User } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "Guest" | "Host" | "Admin";
  status: "Active" | "Blocked";
  joined: string;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string; redirectTo?: string };
  loginAs: (role: "Guest" | "Host" | "Admin") => string;
  register: (name: string, email: string, role: "Guest" | "Host") => string;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("hs_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignored
    }
  }, []);

  const persistUser = (u: AuthUser | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("hs_auth_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("hs_auth_user");
    }
  };

  const login = (email: string, _password: string) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: "No account found with that email address." };
    }
    if (found.status === "Blocked") {
      return { success: false, error: "Your account has been suspended. Please contact support." };
    }
    const authUser: AuthUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role as "Guest" | "Host" | "Admin",
      status: found.status as "Active" | "Blocked",
      joined: found.joined,
    };
    persistUser(authUser);
    const redirectTo =
      found.role === "Admin" ? "/admin/dashboard" :
      found.role === "Host" ? "/host/dashboard" :
      "/user/dashboard";
    return { success: true, redirectTo };
  };

  const loginAs = (role: "Guest" | "Host" | "Admin"): string => {
    let found: User | undefined;
    if (role === "Admin") found = users.find((u) => u.role === "Admin");
    else if (role === "Host") found = users.find((u) => u.role === "Host" && u.status === "Active");
    else found = users.find((u) => u.role === "Guest" && u.status === "Active");

    if (found) {
      const authUser: AuthUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role as "Guest" | "Host" | "Admin",
        status: found.status as "Active" | "Blocked",
        joined: found.joined,
      };
      persistUser(authUser);
    }
    return role === "Admin" ? "/admin/dashboard" : role === "Host" ? "/host/dashboard" : "/user/dashboard";
  };

  const register = (name: string, email: string, role: "Guest" | "Host"): string => {
    const newUser: AuthUser = {
      id: Date.now(),
      name,
      email,
      role,
      status: "Active",
      joined: new Date().toISOString().split("T")[0],
    };
    persistUser(newUser);
    return role === "Host" ? "/host/dashboard" : "/user/dashboard";
  };

  const logout = () => {
    persistUser(null);
    router.push("/");
  };

  if (!mounted) {
    return null; // Return nothing on server to avoid hydration mismatch
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginAs, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function getUserInitials(name?: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
