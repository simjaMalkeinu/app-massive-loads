import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Telefono(props) {
  const { telefono, indice } = props;
  const [data, setData] = useState({ ...telefono });
  const [activate, setActivate] = useState(false);

  const { authData } = useContext(AuthContext);
  const { token } = authData;

  const handleChange = (event) => {
    setData({
      ...data,
      numero_telefono: event.target.value,
    });

    telefono.numero_telefono !== event.target.value
      ? setActivate(true)
      : setActivate(false);
  };

  const updateInfo = () => {
    axios
      .put(
        "http://127.0.0.1:8000/api/update/persona/telefono",
        {
          id: telefono.id,
          numero_telefono: data.numero_telefono,
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
          document.getElementById(`alertTelefono-${telefono.id}`).innerHTML =
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
      <div id={"alertTelefono-" + data.id}></div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          value={data.numero_telefono}
          onChange={handleChange}
          id={"t-" + data.id}
        />
        <button
          onClick={updateInfo}
          className="btn btn-outline-success"
          type="button"
          disabled={!activate}
          id={"btn-telefono-" + data.id}
        >
          Actualizar
        </button>
      </div>
    </>
  );
}
