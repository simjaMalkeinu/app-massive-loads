import PropTypes from "prop-types";

export default function List(props) {
  const { lista, color } = props;
  return lista.map((item, key) => {
    return (
      <span className={`badge text-bg-${color} text-light`} key={key}>
        {item}
      </span>
    );
  });
}

List.propType = {
  lista: PropTypes.array,
  color: PropTypes.string
}
