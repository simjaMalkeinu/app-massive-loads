import * as XLSX from "xlsx";

export default function InputFile(props) {
  const { setFileData, setIsLoading, fileData } = props;

  // Manejar el evento de arrastre (drag)
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Obtener el archivo desde el evento
    const file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Validar el tipo de archivo
    if (
      fileExtension !== "xlsx" &&
      fileExtension !== "xls" &&
      fileExtension !== "csv"
    ) {
      alert("Por favor, sube un archivo Excel (.xlsx, .xls) o CSV.");
      return;
    }

    setIsLoading(true);

    // Procesar archivos Excel
    if (fileExtension === "xlsx" || fileExtension === "xls") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convertir la hoja a una matriz (array de arrays)
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        // Convertir la primera hoja a CSV
        const csvData = XLSX.utils.sheet_to_csv(sheet);

        // Crear un archivo CSV virtual
        const csvBlob = new Blob([csvData], { type: "text/csv" });
        const csvFile = new File(
          [csvBlob],
          file.name.replace(/\.\w+$/, ".csv"),
          {
            type: "text/csv",
          }
        );

        setFileData({
          ...fileData,
          file: csvFile, // Archivo CSV virtual
          fileName: file.name,
          data: jsonData, // Guardar los datos como array
        });
        setIsLoading(false);
      };

      reader.onerror = (error) => {
        alert("Error al leer el archivo: " + error);
        setIsLoading(false);
      };

      reader.readAsBinaryString(file);
    }
    // Procesar archivos CSV
    else if (fileExtension === "csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target.result;

        // Convertir el texto CSV en un array de arrays
        const rows = csvText.split("\n").map((row) => row.split(","));

        setFileData({
          ...fileData,
          file,
          fileName: file.name,
          data: rows, // Guardar los datos como array
        });
        setIsLoading(false);
      };

      reader.onerror = (error) => {
        alert("Error al leer el archivo CSV: " + error);
        setIsLoading(false);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div
      className="file-upload-wrapper"
      style={{
        border: "2px dashed #007bff",
        padding: "30px",
        textAlign: "center",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        id="file-upload"
        accept=".xlsx, .xls, .csv"
        onChange={handleDrop}
        style={{ display: "none" }}
      />
      <label htmlFor="file-upload">
        <i
          className="bi bi-upload"
          style={{ fontSize: "2rem", color: "#007bff" }}
        ></i>
        <p>
          <strong>Arrastra y suelta un archivo</strong>
        </p>
        <p>o</p>
        <div
          type="button"
          className="btn btn-primary"
          style={{ marginTop: "10px", cursor: "pointer" }}
        >
          Seleccionar archivo
        </div>
      </label>
    </div>
  );
}
