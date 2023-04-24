import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useAlbum } from "../hooks";
import { Col, Row } from "reactstrap";

export function Album() {
  const { artist_, album_ } = useParams();
  const { album, setAlbum } = useAlbum(artist_, album_);
  const location = useLocation();

  return (
    <>
      {album.length !== 0 && (
        <>
          <Row>
            <Col xs={4}>
              <h4 className="text-center fst-italic mb-4 text-truncate">
                <i className="bi bi-cassette me-3"></i>
                {album.name}
              </h4>
              {album.songs.map((x) => (
                <div
                  className={
                    "px-3 py-1 rounded hover text-truncate" +
                    (decodeURI(location.pathname).includes(x.name)
                      ? " bg-primary"
                      : "")
                  }
                >
                  <Link to={`/${x.artist}/${x.album}/${x.name}`}>
                    <i className="bi bi-soundwave me-2"></i>
                    {x.name}
                  </Link>
                </div>
              ))}
            </Col>
            <Col xs={8}>
              <Outlet />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
