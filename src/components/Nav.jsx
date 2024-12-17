import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Nav() {
  const { authData, logout } = useContext(AuthContext);

  const { roles } = authData;

  // console.log(roles)

  return (
    <nav className="navbar navbar-expand-lg bg-dark text-light">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          Subida masiva
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {/* Mueve el menú a la derecha usando ms-auto */}
            <div className="navbar-nav ms-auto">
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to="/Home"
              >
                Personas
              </Link>
              {roles.includes("admin") && (
                <Link className="nav-link text-light" to="/Upload-data">
                  Cargar informacion
                </Link>
              )}
              <Link className="nav-link text-light" to="/" onClick={logout} >
                Cerrar sesion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
