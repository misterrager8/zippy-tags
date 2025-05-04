import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import { createContext, useEffect, useState } from "react";
import { api } from "./util";
import Button from "./components/atoms/Button";
import TagEditor from "./components/organisms/TagEditor";
import BulkEditor from "./components/organisms/BulkEditor";
import ArtistItem from "./components/organisms/items/ArtistItem";
import AlbumItem from "./components/organisms/items/AlbumItem";
import SongItem from "./components/organisms/items/SongItem";

export const MultiContext = createContext();

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("zippy-tags-theme") || "light"
  );
  const [artists, setArtists] = useState([]);

  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [bulkEditing, setBulkEditing] = useState(false);

  const [tag, setTag] = useState(null);

  useEffect(() => {
    localStorage.setItem("zippy-tags-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    getArtists();
  }, []);

  useEffect(() => {
    selectedSong ? getSong() : setTag(null);
  }, [selectedSong]);

  useEffect(() => {
    setSelectedAlbum(null);
    setSelectedSong(null);
  }, [selectedArtist]);

  const getArtists = () =>
    api("artists", {}, (data) => setArtists(data.artists));

  const getSong = () =>
    api(
      "song",
      {
        artist: selectedArtist?.name,
        album: selectedAlbum?.name,
        name: selectedSong?.name,
      },
      (data) => setTag(data)
    );

  const contextValue = {
    selectedArtist: selectedArtist,
    setSelectedArtist: setSelectedArtist,
    selectedAlbum: selectedAlbum,
    setSelectedAlbum: setSelectedAlbum,
    selectedSong: selectedSong,
    setSelectedSong: setSelectedSong,
    tag: tag,
    setTag: setTag,
  };

  return (
    <MultiContext.Provider value={contextValue}>
      <div className="p-4">
        <div className="between mb-4">
          <Button
            onClick={() => setSelectedArtist(null)}
            icon="tags-fill"
            text="zippy-tags"
            border={false}
          />
          <Button
            icon={theme === "light" ? "sun-fill" : "moon-fill"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </div>
        <div className="row">
          <div
            className="col-2 border-end"
            style={{ height: "85vh", overflowY: "auto" }}>
            {artists.map((x) => (
              <ArtistItem item={x} />
            ))}
          </div>
          {selectedArtist && (
            <div
              className="col-2 border-end"
              style={{ height: "85vh", overflowY: "auto" }}>
              {selectedArtist?.albums.map((x) => (
                <AlbumItem item={x} />
              ))}
            </div>
          )}
          {selectedAlbum && (
            <div
              className="col-2 border-end"
              style={{ height: "85vh", overflowY: "auto" }}>
              <Button
                className="w-100 mb-1"
                active={bulkEditing}
                onClick={() => setBulkEditing(!bulkEditing)}
                icon="pencil"
                text="Tag All"
              />
              {bulkEditing && <BulkEditor className="my-3" />}
              {selectedAlbum?.songs.map((x) => (
                <SongItem item={x} />
              ))}
            </div>
          )}

          {tag && (
            <div
              className="col-6"
              style={{ height: "85vh", overflowY: "auto" }}>
              <TagEditor />
            </div>
          )}
        </div>
      </div>
    </MultiContext.Provider>
  );
}

export default App;
