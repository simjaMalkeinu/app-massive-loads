import { useState } from "react";
import userIcon from "/avatar.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    document.getElementById("loader").hidden = false;
    document.getElementById("btn-submit").disabled = true;

    axios
      .post("http://127.0.0.1:8000/api/register", formData)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        const alertas = document.getElementById("alertas");

        let messages = `<div class="alert alert-${
          data.status === 200 ? "success" : "danger"
        } alert-dismissible" role="alert">`;

        if (data.data.length > 0) {
          data.data.forEach((msg) => {
            messages += `<li>${msg}</li>`;
          });
        } else {
          messages += `<li>${data.message}</li>`;
        }

        messages +=
          '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

        alertas.innerHTML = messages;

        if (data.status === 200) {
          navigate("/", { state: { register: true } });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        document.getElementById("loader").hidden = true;
        document.getElementById("btn-submit").disabled = false;
      });
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
      <div className="col-md-5 shadow-sm card pt-3 px-3">
        <img
          src={userIcon}
          className="mx-auto mb-2"
          alt="user icon"
          style={{ maxWidth: "150px" }}
        />

        <h1 className="text-center my-2">Registrarse</h1>

        <div id="alertas"></div>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Nombre"
              onChange={handleChange}
            />
            <label htmlFor="name">Nombre</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={handleChange}
            />
            <label htmlFor="email">Correo</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="*****"
              onChange={handleChange}
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              placeholder="name@example.com"
              onChange={handleChange}
            />
            <label htmlFor="confirm_password">Confirmar contraseña</label>
          </div>

          <div className="input-group input-group-lg">
            <input
              type="submit"
              className="form-control btn text-white"
              style={{ backgroundColor: "#2c5c73" }}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              value="Registrarse"
              id="btn-submit"
            />
          </div>

          <p className="mt-3 text-center">
            <span>Ya tienes una cuenta, </span>
            <a href="/">Inicia sesion aqui.</a>
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
