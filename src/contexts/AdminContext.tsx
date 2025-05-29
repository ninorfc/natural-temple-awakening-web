
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se há uma sessão ativa
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      const session = JSON.parse(adminSession);
      const now = new Date().getTime();
      
      // Verificar se a sessão não expirou (24 horas)
      if (now - session.timestamp < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Credenciais simples para admin (em produção, usar autenticação mais robusta)
    if (username === 'admin' && password === 'sabedoria2024') {
      setIsAuthenticated(true);
      
      // Salvar sessão
      const session = {
        timestamp: new Date().getTime(),
        user: 'admin'
      };
      localStorage.setItem('adminSession', JSON.stringify(session));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminSession');
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
