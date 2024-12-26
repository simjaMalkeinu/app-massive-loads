import axios from "axios";
import { useState, useContext } from "react";

import { AuthContext } from "../context/authContext";

export default function Persona(props) {
  const { info } = props;
  const [data, setData] = useState({ ...info });
  const [activate, setActivate] = useState(false);

  const { authData } = useContext(AuthContext);
  const { token } = authData;

  const handleChange = (event) => {
    const { title, value } = event.target;
    setData({
      ...data,
      [title]: value,
    });

    info[title] !== value ? setActivate(true) : setActivate(false);
  };

  const updateInfo = () => {
    axios
      .put(
        "http://127.0.0.1:8000/api/update/persona/info",
        {
          id: data.id,
          nombre: data.nombre,
          paterno: data.paterno,
          materno: data.materno,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200 && response.data.result === 1) {
          document.getElementById("alertInfo").innerHTML =
            `<div class="alert alert-success alert-dismissible" role="alert">` +
            `   <div>${response.data.message}</div>` +
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
            "</div>";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div id="alertInfo"></div>
      {Object.keys(info)
        .filter(
          (dato) =>
            dato !== "id" && dato !== "created_at" && dato !== "updated_at"
        )
        .map((dato, index) => {
          return (
            <div className="form-floating mb-3" key={index}>
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
                onChange={handleChange}
                value={data[dato]}
                title={dato}
              />
              <label htmlFor="nombre">{dato}</label>
            </div>
          );
        })}

      <button
        className="btn btn-outline-info mb-4"
        disabled={!activate}
        onClick={updateInfo}
      >
        Actualizar informacion de la persona
      </button>
    </>
  );
}
