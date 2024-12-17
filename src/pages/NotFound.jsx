import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="fs-4 text-muted">Oops, la página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
