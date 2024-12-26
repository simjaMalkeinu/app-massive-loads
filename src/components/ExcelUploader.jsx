import { useState, useContext } from "react";
import Loader from "./Loader";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import InputFile from "./InputFile";
import ExcelPreview from "./ExcelPreview";

export default function ExcelUploader() {
  const [fileData, setFileData] = useState({
    data: [],
    fileName: "",
    file: null,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { authData } = useContext(AuthContext);
  const { token } = authData;

  // Subir el archivo al servidor
  const uploadFile = () => {
    if (isUploading) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", fileData.file);

    axios
      .post("http://127.0.0.1:8000/api/Upload-data", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setIsUploading(false);
        console.log(data);

        if (data.status === 200) {
          setFileData({
            data: [],
            fileName: "",
            file: null,
          });

          document.getElementById(
            "alerta"
          ).innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">
       <div>${data.message}</div>
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
        }
      })
      .catch((err) => {
        console.log("Error: ", err.message);
        setIsUploading(false);
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Subir Archivo Excel</h2>

      <div id="alerta"></div>

      <InputFile
        setFileData={setFileData}
        setIsLoading={setIsLoading}
        fileData={fileData}
      />

      {fileData.fileName && (
        <p>
          <strong>Archivo seleccionado:</strong> {fileData.fileName}
        </p>
      )}

      {isLoading && <Loader activate={true} />}

      {fileData.data.length > 0 && (
        <ExcelPreview
          fileData={fileData}
          uploadFile={uploadFile}
          isUploading={isUploading}
        />
      )}
    </div>
  );
}
