import { useContext, useEffect, useState } from "react";
import { MultiContext } from "../../App";
import Input from "../atoms/Input";
import { api } from "../../util";
import Button from "../atoms/Button";

export default function TagEditor({ className = "" }) {
  const multiCtx = useContext(MultiContext);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [saved, setSaved] = useState(false);

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeArtist = (e) => setArtist(e.target.value);
  const onChangeAlbum = (e) => setAlbum(e.target.value);
  const onChangeYear = (e) => setYear(e.target.value);
  const onChangeGenre = (e) => setGenre(e.target.value);
  const onChangeLyrics = (e) => setLyrics(e.target.value);

  const editTag = (e) => {
    e.preventDefault();
    api(
      "edit",
      {
        artist: multiCtx.selectedArtist?.name,
        album: multiCtx.selectedAlbum?.name,
        name: multiCtx.selectedSong?.name,
        new_title: title,
        new_artist: artist,
        new_album: album,
        new_year: year,
        new_genre: genre,
        lyrics: lyrics,
      },
      (data) => {
        setSaved(true);
        setTimeout(() => setSaved(false), 1000);
      }
    );
  };

  useEffect(() => {
    setTitle(multiCtx.tag.title);
    setArtist(multiCtx.tag.artist);
    setAlbum(multiCtx.tag.album);
    setYear(multiCtx.tag.year);
    setGenre(multiCtx.tag.genre);
    setLyrics(multiCtx.tag.lyrics);
  }, [multiCtx.tag]);

  return (
    <form onSubmit={(e) => editTag(e)} className={className}>
      <div className="row mb-2">
        <span className="form-text col-1">Title</span>
        <Input
          className="fst-italic col"
          onChange={onChangeTitle}
          value={title}
        />
      </div>
      <div className="row mb-2">
        <span className="form-text col-1">Artist</span>
        <Input
          className="fst-italic col"
          onChange={onChangeArtist}
          value={artist}
        />
      </div>
      <div className="row mb-2">
        <span className="form-text col-1">Album</span>
        <Input
          className="fst-italic col"
          onChange={onChangeAlbum}
          value={album}
        />
      </div>
      <div className="row mb-2">
        <span className="form-text col-1">Year</span>
        <Input
          className="fst-italic col"
          onChange={onChangeYear}
          value={year}
        />
      </div>
      <div className="row mb-2">
        <span className="form-text col-1">Genre</span>
        <Input
          className="fst-italic col"
          onChange={onChangeGenre}
          value={genre}
        />
      </div>
      <div className="row mb-2">
        <span className="form-text col-1">Lyrics</span>
        <textarea
          rows={15}
          placeholder="..."
          className="form-control form-control-sm fst-italic col"
          onChange={onChangeLyrics}
          autoComplete="off"
          value={lyrics}></textarea>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <Button
          type_="submit"
          text="Save"
          icon={saved ? "check-lg" : "floppy2"}
          className="col-11"
        />
      </div>
    </form>
  );
}
