import $ from "jquery";
import { useState } from "react";

export function SongResult({ result }) {
  const [loading, setLoading] = useState(false);

  const syncSong = () => {
    setLoading(true);
    $.get(
      "/sync_song",
      {
        genius_id: result.id,
      },
      function (data) {
        $("#title").val(data.title_with_featured);
        $("#lyrics").val(data.lyrics);
        setLoading(false);
        $("#title").focus();
      }
    );
  };

  return (
    <a onClick={() => syncSong()} className="px-3 py-1 hover rounded row">
      <span className="col-1">
        {loading ? (
          <span className="spinner-border spinner-border-sm"></span>
        ) : (
          <i className="bi bi-tags-fill text-success"></i>
        )}
      </span>
      <span className="col fst-italic px-0 text-truncate">
        {result.title_with_featured}
      </span>
    </a>
  );
}
