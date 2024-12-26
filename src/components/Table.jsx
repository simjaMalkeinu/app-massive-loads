import PropTypes from "prop-types";
import List from "./List";
import Pagination from "./Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
3;
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export default function Table(props) {
  const { information, getData } = props;
  const { data, links } = information;

  const { authData } = useContext(AuthContext);
  const { token } = authData;

  const deletePersona = (id) => {
    axios
      .delete("http://127.0.0.1:8000/api/delete/persona/" + id, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        getData()
        if (response.data.status === 200 && response.data.result === 1) {
          document.getElementById("alert").innerHTML =
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
    <div id="alert"></div>
      <div
        style={{ maxHeight: "500px", overflowY: "auto" }}
        className="custom-scroll"
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col"># ID</th>
              <th scope="col">NOMBRE COMPLETO</th>
              <th scope="col">TELEFONOS DE CONTACTO</th>
              <th scope="col">DIRECCIONES</th>
              <th scope="col">Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((persona, key) => {
              return (
                <tr key={key}>
                  <td>{persona.id}</td>
                  <td>
                    {persona.nombre} {persona.paterno} {persona.materno}
                  </td>
                  <td style={{ maxWidth: "450px" }}>
                    <div className="d-flex gap-3 flex-wrap">
                      <List lista={persona.telefonos} color={"secondary"} />
                    </div>
                  </td>
                  <td style={{ maxWidth: "450px" }}>
                    <div className="d-flex gap-3 flex-wrap">
                      <List lista={persona.direcciones} color={"info"} />
                    </div>
                  </td>
                  <td>
                    <Link
                      className="btn btn-outline-warning"
                      to={"/edit/" + persona.id}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => deletePersona(persona.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination getData={getData} links={links} />
    </>
  );
}

Table.propTypes = {
  information: PropTypes.object,
  getData: PropTypes.func,
};
