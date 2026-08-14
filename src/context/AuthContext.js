'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock login logic
    if (email === 'admin@lonuestro.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        name: 'Administrador',
        email: 'admin@lonuestro.com',
        role: 'admin'
      };
      setUser(adminUser);
      return { success: true, user: adminUser };
    }
    
    // Default generic user login
    if (email && password) {
      const normalUser = {
        id: '2',
        name: email.split('@')[0],
        email: email,
        role: 'user'
      };
      setUser(normalUser);
      return { success: true, user: normalUser };
    }

    return { success: false, error: 'Credenciales inválidas' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
