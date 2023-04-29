import { useEffect, useState } from "react";
import $ from "jquery";
import { AlbumResult } from "./AlbumResult";

export function AlbumSearch({ album }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const manualSearch = (query) => {
    setLoading(true);
    $.get(
      "/search_album",
      {
        query: query,
      },
      function (data) {
        setResults(data.results);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    manualSearch(`${album.name} ${album.artist}`);
  }, []);

  return (
    <div className="p-4 my-3 rounded" style={{ border: "1px solid" }}>
      <h4 className="text-center mb-4">Genius Search</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          manualSearch($("#query").val());
        }}
      >
        <input
          id="query"
          className="form-control"
          autoComplete="off"
          required
          placeholder="Search"
        />
      </form>
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
