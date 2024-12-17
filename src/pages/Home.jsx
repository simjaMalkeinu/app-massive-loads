import axios from "axios";
import Nav from "../components/Nav";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Table from "../components/Table";
import { useState } from "react";

export default function Home() {
  const { authData } = useContext(AuthContext);
  const [info, setInfo] = useState();
  const [loader, setLoader] = useState(true);

  const { token, username } = authData;

  const getData = (url = "http://127.0.0.1:8000/api/personas") => {
    setLoader(true);
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setInfo(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Nav />

      <div className="container">
        <h1 className="text-center my-4">Bienvenido {username}</h1>
        <div className="card p-4">
          <h2>Tabla de informacion personal</h2>
          <br />
          <br />
          {info ? <Table information={info} getData={getData} /> : null}

          <Loader activate={loader} />
        </div>
      </div>
    </>
  );
}
