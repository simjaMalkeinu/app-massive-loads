import { createContext, useState } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    // Cargar desde localStorage si existe
    const savedData = localStorage.getItem("authData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const login = (data) => {
    // Guardar en el estado y en localStorage
    setAuthData(data);
    localStorage.setItem("authData", JSON.stringify(data));
  };

  const logout = () => {
    // Limpiar el estado y localStorage
    setAuthData(null);
    localStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
