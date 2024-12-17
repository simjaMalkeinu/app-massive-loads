export default function Loader(props) {
  const { activate } = props;
  return (
    <div className="mt-3 d-flex justify-content-center align-content-center">
      <div
        className="spinner-border"
        role="status"
        id="loader"
        hidden={activate ? !activate : true}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
