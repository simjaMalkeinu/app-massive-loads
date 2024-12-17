export default function Pagination(props) {
  const { getData, links } = props;

  // Reemplaza entidades específicas
  const decodedLabel = (label) => {
    return label
    ?.replace(/&raquo;/g, "»")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&laquo;/g, "«");
  };

  return (
    <nav className="mt-3">
      <ul className="pagination justify-content-center">
        {links.map((link, index) => {
          return (
            <li
              key={index}
              className={`page-item ${link.url === null ? "disabled" : ""} ${
                link.active ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => {
                  console.log(link.url);
                  getData(link.url)
                }}
              >
                {decodedLabel(link.label)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
