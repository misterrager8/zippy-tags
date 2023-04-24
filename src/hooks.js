import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import { LoadingContext } from "./pages/Home";

export const useArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    fetch("/artists")
      .then((response) => response.json())
      .then((data) => {
        setArtists(data.artists);
        setLoading(false);
      });
  }, []);

  return { artists, setArtists };
};

export const useArtist = (name) => {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    $.get(
      "/artist",
      {
        name: name,
      },
      function (data) {
        setArtist(data);
      }
    );
  }, [name]);

  return { artist, setArtist };
};

export const useAlbum = (artist_, name) => {
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    $.get(
      "/album",
      {
        artist: artist_,
        name: name,
      },
      function (data) {
        setAlbum(data);
      }
    );
  }, [name]);

  return { album, setAlbum };
};

export const useTag = (artist, album, name) => {
  const [tag, setTag] = useState([]);

  useEffect(() => {
    $.get(
      "/song",
      {
        artist: artist,
        album: album,
        name: name,
      },
      function (data) {
        setTag(data);
      }
    );
  }, [artist, album, name]);

  return { tag, setTag };
};
