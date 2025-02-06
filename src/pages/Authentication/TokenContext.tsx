import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface TokenContextProps {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(interval);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8001/api/login/', {
        username,
        password,
      });
      setToken(response.data.access);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: localStorage.getItem('refresh_token'),
      });
      setToken(response.data.access);
      localStorage.setItem('access_token', response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  return (
    <TokenContext.Provider value={{ token, login, logout, refreshToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenProvider, TokenContext };