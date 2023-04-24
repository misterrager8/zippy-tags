import { Outlet, useParams } from "react-router-dom";
import { useArtist } from "../hooks";
import { Button, Col, Row } from "reactstrap";

import { AlbumItem } from "../components/AlbumItem";
import { createContext, useState } from "react";

export const FullscreenContext = createContext();

export function Artist() {
  const { artist_ } = useParams();
  const { artist, setArtist } = useArtist(artist_);
  const [fullscreen, setFullscreen] = useState(false);

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
            <Col style={{ borderRight: "1px dotted" }} xs={3}>
              <div className="">
                <h4 className="text-center mb-4">
                  <i className="bi bi-person-fill me-3"></i>
                  {artist.name}
                </h4>
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
