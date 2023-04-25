import { useState } from "react";
import $ from "jquery";

export function AlbumResult({ source, result }) {
  const [loading, setLoading] = useState(false);
  const [expand, setExpand] = useState(false);

  const syncAlbum = (geniusId) => {
    setLoading(true);
    $.get(
      "/sync_album",
      {
        artist: source.artist,
        name: source.name,
        genius_id: geniusId,
      },
      function (data) {
        setLoading(false);
        data.status_code === 500
          ? alert("Oops, Didnt work :")
          : alert("Finished!");
      }
    );
  };

  return (
    <div
      className={"px-3 py-1 hover rounded row" + (expand ? " bg-primary" : "")}
    >
      <a
        title={result.name}
        className="text-truncate"
        onClick={() => setExpand(!expand)}
      >
        <span className="col-1">
          {loading ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            <i className="bi bi-cassette"></i>
          )}
        </span>
        <span className="col fst-italic px-0 text-truncate">
          <span className="ps-3">{result.name}</span>
        </span>
      </a>
      {expand && (
        <div className="text-center py-3">
          <a onClick={() => syncAlbum(result.id)}>
            <img
              className="rounded-3"
              width={200}
              height={200}
              src={result.cover_art_url}
            />
            <div className="mt-3">
              <div className="fst-italic">{result.name}</div>
              <div>{result.artist.name}</div>
              <div className="small opacity-50">
                {result.release_date_for_display}
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
