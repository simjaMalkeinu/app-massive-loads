import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ children }) => {
  const { authData } = useContext(AuthContext); // Obtener datos de autenticación del contexto

  // Si no está autenticado, redirige al login
  if (!authData) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, renderiza el contenido
  return children;
};

export default PrivateRoute;
