import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import { LoadingContext } from "../pages/Home";

export function BulkEditor({ album }) {
  const [loading, setLoading] = useContext(LoadingContext);

  const bulkEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    $.post(
      "/bulk_edit",
      {
        artist: album.artist,
        name: album.name,
        new_title: $("#bulk-title").val(),
        new_artist: $("#bulk-artist").val(),
        new_year: $("#bulk-year").val(),
        new_genre: $("#bulk-genre").val(),
        new_cover_art: $("#bulk-cover-art").val(),
      },
      function (data) {
        alert(JSON.stringify(data));
        setLoading(false);
      }
    );
  };

  return (
    <>
      <form onSubmit={(e) => bulkEdit(e)} className="mb-4">
        <input
          className="form-control form-control-sm my-1"
          autoComplete="off"
          id="bulk-title"
          placeholder="Title"
        />
        <input
          className="form-control form-control-sm my-1"
          autoComplete="off"
          id="bulk-artist"
          placeholder="Artist"
        />
        <input
          className="form-control form-control-sm my-1"
          autoComplete="off"
          id="bulk-year"
          placeholder="Year"
        />
        <input
          className="form-control form-control-sm my-1"
          autoComplete="off"
          id="bulk-genre"
          placeholder="Genre"
        />
        <input
          className="form-control form-control-sm my-1"
          autoComplete="off"
          id="bulk-cover-art"
          placeholder="Cover Art URL"
        />
        <button type="submit" className="btn btn-sm btn-outline-primary w-100">
          Save
        </button>
      </form>
    </>
  );
}
