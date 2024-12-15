import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import listRoutes from "./routes/listRoutes";
import PrivateRoute from "./routes/privateRoutes";
import Login from "./pages/login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Register />} />

        {/* Rutas protegidas */}
        {listRoutes.map((routeItem, index) => (
          <Route
            key={index}
            path={routeItem.path}
            element={
              <PrivateRoute>
                <routeItem.element />
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
