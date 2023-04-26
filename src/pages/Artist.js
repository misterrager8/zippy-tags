import { Outlet, useParams } from "react-router-dom";
import { useArtist } from "../hooks";
import { Button, Col, Row } from "reactstrap";

import { AlbumItem } from "../components/AlbumItem";
import { createContext, useState } from "react";
import $ from "jquery";

export const FullscreenContext = createContext();

export function Artist() {
  const { artist_ } = useParams();
  const { artist, setArtist } = useArtist(artist_);
  const [fullscreen, setFullscreen] = useState(false);

  const createAlbum = (e) => {
    e.preventDefault();
    $.post(
      "/create_album",
      {
        artist: artist.name,
        name: $("#new-album").val(),
      },
      function (data) {
        setArtist(data);
        e.target.reset();
      }
    );
  };

  return (
    <>
      <FullscreenContext.Provider value={[fullscreen, setFullscreen]}>
        <Button
          size="sm"
          outline
          className="border-0 mt-3"
          onClick={() => setFullscreen(!fullscreen)}
        >
          <i className={"me-2 bi bi-eye" + (fullscreen ? "" : "-slash")}></i>
          {(fullscreen ? "Show" : "Hide") + " Albums"}
        </Button>
        <Row className="mt-3">
          {!fullscreen && (
            <Col xs={3}>
              <div className="">
                <h4 className="text-center mb-4">
                  <i className="bi bi-person-fill me-3"></i>
                  {artist.name}
                </h4>
                <form
                  className="input-group input-group-sm mb-4"
                  onSubmit={(e) => createAlbum(e)}
                >
                  <input
                    autoComplete="off"
                    className="form-control"
                    id="new-album"
                    placeholder="New Folder"
                  />
                </form>
                {artist.length !== 0 && (
                  <>
                    {artist.albums.map((x) => (
                      <AlbumItem item={x} />
                    ))}
                  </>
                )}
              </div>
            </Col>
          )}
          <Col xs={fullscreen ? 12 : 9}>
            <Outlet />
          </Col>
        </Row>
      </FullscreenContext.Provider>
    </>
  );
}
