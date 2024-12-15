import { useState } from "react";
import userIcon from "/avatar.svg";

import axios from "axios";
import { useContext } from "react";

import { AuthContext } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const register = location.state?.alert;

  const handleSubmit = (e) => {
    e.preventDefault();

    document.getElementById("loader").hidden = false;
    document.getElementById("btn-submit").disabled = true;

    axios
      .post(`http://127.0.0.1:8000/api/login`, {
        email,
        password,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.status === 200) {
          const userData = {
            token: data.response.token,
            username: data.response.username,
            email: data.response.email,
          };

          login(userData);

          navigate("/Home");
        } else {
          console.log(data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        document.getElementById("loader").hidden = true;
        document.getElementById("btn-submit").disabled = false;
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    id === "email" ? setEmail(value) : setPassword(value);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div className="col-md-5 card p-4 shadow-sm">
        <img
          src={userIcon}
          className="mx-auto mb-4"
          alt="user icon"
          style={{ maxWidth: "150px" }}
        />
        <h1 className="text-center">Inicio de sesion</h1>

        {register ? (
          <div className="alert alert-success alert-dismissible" role="alert">
            <b>Usuario creado con exito</b>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={handleChange}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-group input-group-lg">
            <input
              type="submit"
              className="form-control btn text-white"
              style={{ backgroundColor: "#2c5c73" }}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              value="Iniciar Sesion"
              id="btn-submit"
            />
          </div>

          <p className="mt-3 text-center">
            <span>Aun no tienes una cuenta, </span>
            <a href="/Register">Registrate aqui...</a>
          </p>

          <div className="mt-3 d-flex justify-content-center align-content-center">
            <div className="spinner-border" role="status" id="loader" hidden>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
