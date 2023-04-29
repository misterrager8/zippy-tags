import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useAlbum } from "../hooks";
import { Button, Col, Row } from "reactstrap";
import { useState } from "react";
import { AlbumSearch } from "../components/AlbumSearch";
import { BulkEditor } from "../components/BulkEditor";

export function Album() {
  const { artist_, album_ } = useParams();
  const { album, setAlbum } = useAlbum(artist_, album_);
  const [showGenius, setShowGenius] = useState(false);
  const [bulkEditing, setBulkEditing] = useState(false);
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
              <Button
                onClick={() => setShowGenius(!showGenius)}
                type="button"
                color="secondary"
                className="mb-3 w-100"
                size="sm"
                outline
                active={showGenius}
              >
                <i className="bi bi-search me-2"></i>Genius Search
              </Button>
              <Button
                onClick={() => setBulkEditing(!bulkEditing)}
                type="button"
                color="success"
                className="mb-3 w-100"
                size="sm"
                outline
                active={bulkEditing}
              >
                <i className="bi bi-asterisk me-2"></i>Bulk Edit
              </Button>
              {showGenius && <AlbumSearch album={album} />}
              {bulkEditing && <BulkEditor album={album} />}
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
