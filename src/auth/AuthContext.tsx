import { useContext } from 'react';
import { createContext} from 'react';

import { useEffect, useState } from "react";

export type AuthContextType = {
  token: string | null,
  email: string | null,
  isAuthenticated: boolean,
  loading: boolean,
  loginUser: (token: string, email: string) => void,
  logoutUser: () => void,
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken= localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    setToken(savedToken); 
    setEmail(savedEmail);
    setLoading(false); 
  }, []);

  function loginUser(newToken: string, userEmail: string) {
    setToken(newToken);
    setEmail(userEmail);
    localStorage.setItem("token", newToken);
    localStorage.setItem("email", userEmail);
  }

  function logoutUser() {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }

  const isAuthenticated = Boolean(token);

  const value = {
    token,
    email,
    isAuthenticated,
    loading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;