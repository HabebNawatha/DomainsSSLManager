// useAuth.ts
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from '../models/User';

export const useUser = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    const decoded = jwtDecode<JwtPayload>(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return { user, login, logout };
};
