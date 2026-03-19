import { useContext } from 'react';
import { createContext} from 'react';

import { useEffect, useState } from "react";

export type AuthContextType = {
  token: string | null,
  isAuthenticated: boolean,
  loading: boolean,
  loginUser: (token: string) => void,
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken= localStorage.getItem("token");
    setToken(savedToken); 
    setLoading(false); 
  }, []);

  function loginUser(newToken: string) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function logoutUser() {
    setToken(null);
    localStorage.removeItem("token");
  }

  const isAuthenticated = Boolean(token);

  const value = {
    token,
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