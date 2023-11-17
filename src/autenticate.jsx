import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: false,
  error: null,
});

export function AuthProvider({ children }) {
  const [user, setUsuario] = useState(false);
  const [error, setError] = useState(null);

  // Verificar si hay una sesión activa al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const login = async (doc, password) => {
    try {
      const response = await fetch("http://localhost/api_proyecto.github.io/api.php?apicall=login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "passw": password, "documento": doc }),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.error === false) {
          setUsuario(true);

          // Almacena la información de autenticación en localStorage
          localStorage.setItem('user', JSON.stringify(true));
        } else {
          setError("Credenciales inválidas, inténtelo nuevamente");
        }
      } else {
        setError("Hubo un error, inténtelo más tarde");
      }
    } catch (error) {
      setError("Hubo un error, inténtelo más tarde");
    }
  };

  const logout = () => {
    // Realiza la lógica de cierre de sesión actualizando el estado del usuario.
    setUsuario(false);

    // Borra la información de autenticación del localStorage al cerrar sesión
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}