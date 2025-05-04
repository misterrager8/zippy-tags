from pathlib import Path

import click
import eyed3
import requests
from flask import Response, request, current_app, send_from_directory
from lyricsgenius import Genius

from . import app, config
from .models import Album, Artist, Song

genius = Genius()
eyed3.log.setLevel("ERROR")


@current_app.get("/")
def index():
    return send_from_directory(current_app.static_folder, "index.html")


@current_app.post("/artists")
def artists():
    msg = ""
    success = True
    artists = []

    try:
        artists = [i.to_dict() for i in Artist.all()]
    except Exception as e:
        success = False
        msg = str(e)

    return {"artists": artists, "msg": msg, "success": success}


@current_app.post("/artist")
def artist():
    return Artist(request.json.get("name")).to_dict()


@current_app.post("/album")
def album():
    return Album(request.json.get("artist"), request.json.get("name")).to_dict()


@current_app.post("/song")
def song():
    msg = ""
    success = True

    song_ = Song(
        request.json.get("artist"), request.json.get("album"), request.json.get("name")
    )
    _ = eyed3.load(song_.path).tag
    genre = "Unknown"
    try:
        genre = _.genre.name
    except Exception as e:
        success = False
        msg = str(e)

    return {
        "title": _.title,
        "artist": _.artist,
        "album": _.album,
        "genre": genre,
        "year": str(_.best_release_date),
        "album_artist": _.album_artist,
        "track_num": _.track_num[0],
        "lyrics": "\n".join([i.text for i in _.lyrics]),
        "msg": msg,
        "success": success,
    }


@current_app.post("/sync_song")
def sync_song():
    song_ = genius.song(request.json.get("genius_id")).get("song")
    song_.update({"lyrics": genius.lyrics(song_.get("id"))})
    return song_


@current_app.post("/search_song")
def search_song():
    return {
        "results": [
            i.get("result")
            for i in genius.search_songs(
                f"{request.json.get('name')} {request.json.get('artist')}"
            ).get("hits")[:5]
        ]
    }


@current_app.post("/create_artist")
def create_artist():
    artist_ = Artist(request.form.get("name"))
    artist_.path.mkdir()

    return artist_.name


@current_app.post("/create_album")
def create_album():
    Album(request.form.get("artist"), request.form.get("name")).path.mkdir()

    return Artist(request.form.get("artist")).to_dict()


@current_app.post("/search_album")
def search_album():
    return {
        "results": [
            i.get("result")
            for i in genius.search_albums(request.json.get("query"))["sections"][0][
                "hits"
            ][:5]
        ]
    }


@current_app.post("/search_artists")
def search_artists():
    return {"results": [i.to_dict() for i in Artist.search(request.form.get("query"))]}


@current_app.post("/sync_album")
def sync_album():
    album_ = Album(request.json.get("artist"), request.json.get("name"))
    genius_album = genius.album(request.json.get("genius_id")).get("album")

    try:
        img_data = requests.get(genius_album.get("cover_art_url")).content
        with open("image_name.jpg", "wb") as handler:
            handler.write(img_data)

        for i in album_.songs:
            _ = eyed3.load(i.path).tag
            _.album = genius_album.get("name")
            _.artist = genius_album.get("artist").get("name")
            _.album_artist = genius_album.get("artist").get("name")
            _.images.set(3, img_data=img_data, mime_type="image/jpeg")

            _.save()

        Path("image_name.jpg").unlink()
    except:
        return Response(status=500)
    else:
        return Response(status=200)


@current_app.post("/bulk_edit")
def bulk_edit():
    msg = ""
    success = True

    try:
        album_ = Album(request.json.get("artist"), request.json.get("name"))
        if request.json.get("new_cover_art"):
            img_data = requests.get(request.json.get("new_cover_art")).content
            with open("image_name.jpg", "wb") as handler:
                handler.write(img_data)

        for i in album_.songs:
            _ = eyed3.load(i.path).tag
            _.album = request.json.get("new_title") or _.album
            _.artist = request.json.get("new_artist") or _.artist
            _.album_artist = request.json.get("new_artist") or _.album_artist
            _.genre.name = request.json.get("new_genre") or _.genre.name
            _.release_date = request.json.get("new_year") or _.release_date
            if request.json.get("new_cover_art"):
                _.images.set(3, img_data=img_data, mime_type="image/jpeg")

            _.save()

        Path("image_name.jpg").unlink()
    except Exception as e:
        msg = str(e)
        success = False

    return {"msg": msg, "success": success}


@current_app.post("/edit")
def edit():
    msg = ""
    success = True

    try:
        song_ = Song(
            request.json.get("artist"),
            request.json.get("album"),
            request.json.get("name"),
        )
        _ = eyed3.load(song_.path).tag

        _.title = request.json.get("new_title")
        _.artist = request.json.get("new_artist")
        _.album = request.json.get("new_album")
        _.release_date = request.json.get("new_year")
        _.genre.name = request.json.get("new_genre")
        _.lyrics.set(request.json.get("lyrics"))

        _.save()
    except Exception as e:
        success = False
        msg = str(e)

    return {"msg": msg, "success": success}
