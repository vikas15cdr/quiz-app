// src/frontend/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  name: string;
  userType: 'student' | 'teacher';
}

interface DecodedToken extends User {
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  login: (token: string) => void;
  logout: () => void;
  clearError: () => void;
}

const TOKEN_KEY = 'token';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getUserFromToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    return isExpired ? null : { name: decoded.name, userType: decoded.userType };
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = token ? getUserFromToken(token) : null;

    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem(TOKEN_KEY); // Defensive cleanup
    }
  }, []);

  const login = (token: string) => {
    const userData = getUserFromToken(token);
    if (userData) {
      localStorage.setItem(TOKEN_KEY, token);
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Invalid or expired token');
      logout(); // Defensive fallback
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
