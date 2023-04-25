import { useEffect, useState } from "react";
import $ from "jquery";
import { AlbumResult } from "./AlbumResult";

export function AlbumSearch({ album }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    $.get(
      "/search_album",
      {
        name: album.name,
        artist: album.artist,
      },
      function (data) {
        setResults(data.results);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="p-4 my-3 rounded" style={{ border: "1px solid" }}>
      <h4 className="text-center mb-4">Genius Search</h4>
      {loading ? (
        <span className="spinner-border spinner-border-sm"></span>
      ) : (
        <>
          {results.map((x) => (
            <AlbumResult source={album} result={x} />
          ))}
        </>
      )}
    </div>
  );
}
