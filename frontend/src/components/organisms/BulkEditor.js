import { useContext, useEffect, useState } from "react";
import { MultiContext } from "../../App";
import Input from "../atoms/Input";
import { api } from "../../util";
import Button from "../atoms/Button";

export default function BulkEditor({ className = "" }) {
  const multiCtx = useContext(MultiContext);

  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [coverArt, setCoverArt] = useState("");

  const [saved, setSaved] = useState(false);

  const onChangeArtist = (e) => setArtist(e.target.value);
  const onChangeAlbum = (e) => setAlbum(e.target.value);
  const onChangeYear = (e) => setYear(e.target.value);
  const onChangeGenre = (e) => setGenre(e.target.value);
  const onChangeCoverArt = (e) => setCoverArt(e.target.value);

  const bulkEdit = (e) => {
    e.preventDefault();
    api(
      "bulk_edit",
      {
        artist: multiCtx.selectedArtist?.name,
        name: multiCtx.selectedAlbum?.name,
        new_title: album,
        new_artist: artist,
        new_year: year,
        new_genre: genre,
        new_cover_art: coverArt,
      },
      (data) => {
        setSaved(true);
        setTimeout(() => setSaved(false), 1000);
      }
    );
  };

  return (
    <form onSubmit={(e) => bulkEdit(e)} className={className}>
      <Input
        placeholder="Artist"
        className="fst-italic mb-2"
        onChange={onChangeArtist}
        value={artist}
      />
      <Input
        placeholder="Album"
        className="fst-italic mb-2"
        onChange={onChangeAlbum}
        value={album}
      />
      <Input
        placeholder="Year"
        className="fst-italic mb-2"
        onChange={onChangeYear}
        value={year}
      />
      <Input
        placeholder="Genre"
        className="fst-italic mb-2"
        onChange={onChangeGenre}
        value={genre}
      />
      <Input
        placeholder="Cover Art"
        className="fst-italic mb-2"
        onChange={onChangeCoverArt}
        value={coverArt}
      />
      <Button
        type_="submit"
        text="Save"
        icon={saved ? "check-lg" : "floppy2"}
        className="w-100"
      />
    </form>
  );
}
