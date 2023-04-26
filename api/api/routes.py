from pathlib import Path

import eyed3
import requests
from flask import Response, request
from lyricsgenius import Genius

from . import app, config
from .models import Album, Artist, Song

genius = Genius()


@app.get("/artists")
def artists():
    return {"artists": [i.to_dict() for i in Artist.all()]}


@app.get("/artist")
def artist():
    return Artist(request.args.get("name")).to_dict()


@app.get("/album")
def album():
    return Album(request.args.get("artist"), request.args.get("name")).to_dict()


@app.get("/song")
def song():
    song_ = Song(
        request.args.get("artist"), request.args.get("album"), request.args.get("name")
    )
    _ = eyed3.load(song_.path).tag
    return {
        "title": _.title,
        "artist": _.artist,
        "album": _.album,
        "album_artist": _.album_artist,
        "track_num": _.track_num[0],
        "lyrics": "\n".join([i.text for i in _.lyrics]),
    }


@app.get("/sync_song")
def sync_song():
    song_ = genius.song(request.args.get("genius_id")).get("song")
    song_.update({"lyrics": genius.lyrics(song_.get("id"))})
    return song_


@app.get("/search_song")
def search_song():
    return {
        "results": [
            i.get("result")
            for i in genius.search_songs(
                f"{request.args.get('name')} {request.args.get('artist')}"
            ).get("hits")[:5]
        ]
    }


@app.post("/create_artist")
def create_artist():
    artist_ = Artist(request.form.get("name"))
    artist_.path.mkdir()

    return artist_.name


@app.post("/create_album")
def create_album():
    Album(request.form.get("artist"), request.form.get("name")).path.mkdir()

    return Artist(request.form.get("artist")).to_dict()


@app.get("/search_album")
def search_album():
    return {
        "results": [
            i.get("result")
            for i in genius.search_albums(
                f"{request.args.get('name')} {request.args.get('artist')}"
            )["sections"][0]["hits"][:5]
        ]
    }


@app.post("/search_artists")
def search_artists():
    return {"results": [i.to_dict() for i in Artist.search(request.form.get("query"))]}


@app.get("/sync_album")
def sync_album():
    album_ = Album(request.args.get("artist"), request.args.get("name"))
    genius_album = genius.album(request.args.get("genius_id")).get("album")

    try:
        img_data = requests.get(genius_album.get("cover_art_url")).content
        with open("image_name.jpg", "wb") as handler:
            handler.write(img_data)

        for i in album_.songs:
            _ = eyed3.load(i.path).tag
            _.album = genius_album.get("name")
            _.album_artist = genius_album.get("artist").get("name")
            _.images.set(3, img_data=img_data, mime_type="image/jpeg")

            _.save()

        Path("image_name.jpg").unlink()
    except:
        return Response(status=500)
    else:
        return Response(status=200)


@app.post("/edit")
def edit():
    song_ = Song(
        request.form.get("artist"), request.form.get("album"), request.form.get("name")
    )
    _ = eyed3.load(song_.path).tag

    _.title = request.form.get("new_title")
    _.artist = request.form.get("new_artist")
    _.album = request.form.get("new_album")
    _.album_artist = request.form.get("new_album_artist")
    _.track_num = request.form.get("new_track_num")
    _.lyrics.set(request.form.get("lyrics"))

    _.save()

    return {
        "title": _.title,
        "artist": _.artist,
        "album": _.album,
        "album_artist": _.album_artist,
        "track_num": _.track_num[0],
        "lyrics": "\n".join([i.text for i in _.lyrics]),
    }
