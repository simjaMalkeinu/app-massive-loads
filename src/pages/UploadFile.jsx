import ExcelUploader from "../components/ExcelUploader";
import Nav from "../components/Nav";

export default function UploadFile() {
  return (
    <>
      <Nav />

      <div className="container mt-4">
        <h1 className="text-center" >Subir informacion de las personas</h1>

        <ExcelUploader />
      </div>
    </>
  )
}
