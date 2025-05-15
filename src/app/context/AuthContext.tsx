"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";


interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps>=({children})=>{
    const [user, setUser] = useState<User | null>(null);
 
    const login = (userData:User)=>{
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData))
    }
    const logout =()=>{
        setUser(null);
        localStorage.removeItem("user")
    }
    useEffect(()=>{
        const storeduser = localStorage.getItem("user");
        if(storeduser) {
            setUser(JSON.parse(storeduser))
        }
    },[])

    return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};