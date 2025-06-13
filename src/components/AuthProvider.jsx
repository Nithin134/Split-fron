// src/components/AuthProvider.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api"; // ✅ import axios instance from shared file

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
      }
      setUser(res.data);
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const res = await api.post("/auth/register", { name, email, phone, password });
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
      }
      setUser(res.data);
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setUser(null);
  };

  const loadUser = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await api.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
