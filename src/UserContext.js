// src/UserContext.js

// Importa las bibliotecas necesarias
import { createContext, useContext, useState } from 'react';

// Crea un contexto para el usuario
const UserContext = createContext();

// Define el hook personalizado para acceder al contexto de usuario
export const useUser = () => {
  return useContext(UserContext);
};

// Proveedor de contexto que envuelve la aplicación y gestiona el estado del usuario
export const UserProvider = ({ children }) => {
  // Estado local para almacenar la información del usuario
  const [user, setUser] = useState(null);

  // Proporciona el contexto de usuario y su estado a los componentes secundarios
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};