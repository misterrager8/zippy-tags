import { useParams } from "react-router-dom";
import { useTag } from "../hooks";
import $ from "jquery";
import { Button, ButtonGroup } from "reactstrap";
import { useState } from "react";
import { GeniusBox } from "../components/GeniusBox";

export function Song() {
  const { artist_, album_, name } = useParams();
  const { tag, setTag } = useTag(artist_, album_, name);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showGenius, setShowGenius] = useState(false);

  const edit = (e) => {
    e.preventDefault();
    $.post(
      "/edit",
      {
        artist: artist_,
        album: album_,
        name: name,
        new_title: $("#title").val(),
        new_artist: $("#artist").val(),
        new_album_artist: $("#album-artist").val(),
        new_album: $("#album").val(),
        new_track_num: $("#track-num").val(),
        lyrics: $("#lyrics").val(),
      },
      function (data) {
        setTag(data);
        setSaved(true);
        setTimeout(function () {
          setSaved(false);
        }, 1500);
      }
    );
  };

  return (
    <>
      <form onSubmit={(e) => edit(e)}>
        <ButtonGroup size="sm" className="mb-4">
          <Button
            color={saved ? "success" : "primary"}
            type="submit"
            outline={!saved}
          >
            <i className={"me-2 bi bi-" + (saved ? "check-lg" : "tags")}></i>
            {"Save" + (!saved ? " Changes" : "d.")}
          </Button>
          <Button
            onClick={() => setShowGenius(!showGenius)}
            type="button"
            color="secondary"
            outline
            active={showGenius}
          >
            <i className="bi bi-search me-2"></i>Genius Search
          </Button>
          <Button
            onClick={() => setDeleting(!deleting)}
            type="button"
            color="danger"
            outline
          >
            <i className="bi bi-trash2 me-2"></i>Delete
          </Button>
          {deleting && (
            <Button type="button" color="danger" outline className="border-0">
              Delete?
            </Button>
          )}
        </ButtonGroup>
        {showGenius && <GeniusBox song={tag} />}
        <div className="form-floating mb-1">
          <input
            id="title"
            autoComplete="off"
            className="form-control fst-italic border-0"
            defaultValue={tag.title}
            key={tag.title}
          />
          <label className="form-label" htmlFor="title">
            Title
          </label>
        </div>
        <div className="form-floating mb-1">
          <input
            id="album-artist"
            autoComplete="off"
            className="form-control border-0"
            defaultValue={tag.album_artist}
            key={`${tag.album_artist}-2`}
          />
          <label className="form-label" htmlFor="album-artist">
            Album Artist
          </label>
        </div>
        <div className="form-floating mb-1">
          <input
            id="artist"
            autoComplete="off"
            className="form-control border-0"
            defaultValue={tag.artist}
            key={tag.artist}
          />
          <label className="form-label" htmlFor="artist">
            Artist
          </label>
        </div>
        <div className="form-floating mb-1">
          <input
            id="album"
            autoComplete="off"
            className="form-control fst-italic border-0"
            defaultValue={tag.album}
            key={tag.album}
          />
          <label className="form-label" htmlFor="album">
            Album
          </label>
        </div>
        <div className="form-floating mb-1">
          <input
            id="track-num"
            type="number"
            min={0}
            autoComplete="off"
            className="form-control border-0"
            defaultValue={tag.track_num}
            key={tag.track_num}
          />
          <label className="form-label" htmlFor="track-num">
            Track Number
          </label>
        </div>
        <div className="form-floating" style={{ height: "250px" }}>
          <textarea
            style={{ resize: "none" }}
            id="lyrics"
            autoComplete="off"
            className="form-control h-100"
            defaultValue={tag.lyrics}
            key={`${tag.title}-lyrics`}
          ></textarea>
          <label className="form-label" htmlFor="lyrics">
            Lyrics
          </label>
        </div>
      </form>
    </>
  );
}
