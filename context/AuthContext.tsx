
import React, { createContext, useContext } from 'react';

export interface User {
  name: string;
  email: string;
  subscription: 'Basic' | 'Pro' | 'None';
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
