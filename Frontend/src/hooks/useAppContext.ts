// src/AppContext.ts
import { createContext } from 'react';

export interface AppContextType {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
