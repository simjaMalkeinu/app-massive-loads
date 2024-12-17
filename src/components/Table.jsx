import PropTypes from "prop-types";
import List from "./List";
import Pagination from "./Pagination";

export default function Table(props) {
  const { information, getData } = props;
  const { data, links } = information;

  return (
    <>
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
                      <List
                        lista={persona.telefonos}
                        color={"secondary"}
                      />
                    </div>
                  </td>
                  <td style={{ maxWidth: "450px" }}>
                    <div className="d-flex gap-3 flex-wrap">
                      <List
                        lista={persona.direcciones}
                        color={"info"}
                      />
                    </div>
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
  information : PropTypes.object,
  getData: PropTypes.func
}