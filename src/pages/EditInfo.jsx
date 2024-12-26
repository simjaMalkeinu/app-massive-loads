import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import Telefono from "../components/Telefono";
import Direccion from "../components/Direccion";
import Persona from "../components/Persona";

export default function EditInfo() {
  const { authData } = useContext(AuthContext);
  const { id } = useParams();

  const { token } = authData;
  const [persona, setPersona] = useState({});

  const getPersona = () => {
    axios
      .get(`http://127.0.0.1:8000/api/persona/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setPersona({
          datos: { ...data.persona },
          telefonos: [...data.telefonos],
          direcciones: [...data.direcciones],
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  useEffect(() => {
    getPersona();
  }, []);

  return (
    <>
      <Nav />
      <div className="container mt-4">
        <div className="col-md-6 mx-auto card p-4">
          <h1 className="text-center">Editar informacion</h1>

          {persona.datos ? <Persona info={persona.datos} /> : null}

          <h3>Telefonos de contacto</h3>

          {persona.telefonos
            ? persona.telefonos.map((telefono, index) => {
                return (
                  <Telefono telefono={telefono} indice={index} key={index} />
                );
              })
            : null}

          <h3>Direcciones</h3>

          {persona.direcciones
            ? persona.direcciones.map((direccion, index) => {
                return (
                  <Direccion
                    direccion={direccion}
                    indice={index + 1}
                    key={index}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
