import { Link, useLocation } from "react-router-dom";

export function AlbumItem({ item }) {
  const location = useLocation();
  return (
    <Link
      to={`/${item.artist}/${item.name}`}
      className={
        "px-3 py-1 rounded fst-italic hover d-block text-truncate" +
        (decodeURI(location.pathname).includes(item.name) ? " bg-primary" : "")
      }
    >
      <i className="bi bi-cassette me-3"></i>
      {item.name}
    </Link>
  );
}
