import { Link, useLocation } from "react-router-dom";

export function AlbumItem({ item }) {
  const location = useLocation();
  return (
    <div
      className={
        "px-3 py-1 rounded fst-italic hover text-truncate" +
        (decodeURI(location.pathname).includes(item.name) ? " bg-primary" : "")
      }
    >
      <Link to={`/${item.artist}/${item.name}`}>
        <i className="bi bi-cassette me-3"></i>
        {item.name}
      </Link>
    </div>
  );
}
