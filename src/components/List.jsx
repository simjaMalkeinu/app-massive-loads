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
