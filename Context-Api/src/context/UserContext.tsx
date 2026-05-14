import React, { createContext, useState } from "react";

export interface User {
  name: string;
  email: string;
  role: "admin" | "student" | "guest";
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = (userData: User) => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      if (!userData.name || !userData.email) {
        setError("El nombre y el email son obligatorios");
        setIsLoading(false);
        return;
      }
      
      setUser(userData);
      setIsLoading(false);
    }, 1000); 
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
