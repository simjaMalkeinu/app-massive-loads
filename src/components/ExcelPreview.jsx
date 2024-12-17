export default function ExcelPreview(props) {
  const { uploadFile, isUploading, fileData } = props;
  return (
    <>
      <div className="d-flex gap-2">
        <button
          className="btn btn-dark text-light"
          onClick={uploadFile}
          disabled={isUploading}
        >
          {isUploading ? "Subiendo..." : "Subir Información"}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Vista Previa de los Datos (Max 10 registros)</h3>
        <div
          className="custom-scroll card"
          style={{ overflowY: "auto", maxHeight: "500px" }}
        >
          <table className="table-container">
            <thead>
              <tr>
                {fileData.data[0].map((header, index) => (
                  <th
                    key={index}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#2d2d2d",
                      textAlign: "left",
                      color: "white",
                    }}
                  >
                    {header || `Columna ${index + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.data.slice(1, 11).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {cell || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
