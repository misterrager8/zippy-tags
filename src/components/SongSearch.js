import { useEffect, useState } from "react";
import $ from "jquery";
import { SongResult } from "./SongResult";

export function SongSearch({ song }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    $.get(
      "/search_song",
      {
        name: song.title,
        artist: song.album_artist,
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
            <SongResult result={x} />
          ))}
        </>
      )}
    </div>
  );
}
