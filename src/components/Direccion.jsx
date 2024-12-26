
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

export default function Direccion(props) {
  const { direccion, indice } = props;
  const [data, setData] = useState({ ...direccion });
  const [activate, setActivate] = useState(false);

  const { authData } = useContext(AuthContext);
  const { token } = authData;

  const handleChange = (event) => {
    const { title, value } = event.target;
    setData({
      ...data,
      [title]: value,
    });

    direccion !== data ? setActivate(true) : setActivate(false);
  };

  const updateInfo = () => {
    axios
      .put(
        "http://127.0.0.1:8000/api/update/persona/direccion",
        {
          id: direccion.id,
          calle: data.calle,
          colonia: data.colonia,
          cp: data.cp,
          numero_exterior: data.numero_exterior,
          numero_interior: data.numero_interior,
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
          document.getElementById(`alertDireccion-${direccion.id}`).innerHTML =
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
      <h5>Direccion {"#" + indice}</h5>
      <div id={"alertDireccion-"+direccion.id}></div>
      {Object.keys(direccion)
        .filter(
          (dato) =>
            dato !== "id" &&
            dato !== "persona_id" &&
            dato !== "created_at" &&
            dato !== "updated_at"
        )
        .map((dato, index) => {
          return (
            <div className="input-group flex-nowrap" key={index}>
              <span className="input-group-text" id="addon-wrapping">
                {dato}
              </span>
              <input
                type="text"
                className="form-control"
                value={data[dato]}
                onChange={handleChange}
                title={dato}
              />
            </div>
          );
        })}

      <button
      onClick={updateInfo}
        className="btn btn-outline-success mb-4"
        type="button"
        disabled={!activate}
        id={"btn-telefono-" + data.id}
      >
        Actualizar
      </button>
    </>
  );
}
