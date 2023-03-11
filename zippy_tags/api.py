from pathlib import Path

from flask import current_app, render_template, request

from .models import Album, Artist, Song


@current_app.get("/")
def index():
    return render_template("index.html")


@current_app.get("/artists")
def artists():
    return dict(artists_=[i.name for i in Artist.all()])


@current_app.get("/albums")
def albums():
    artist_ = Artist(request.args.get("name"))

    return dict(albums_=[i.to_dict() for i in artist_.albums], artist=artist_.name)


@current_app.get("/songs")
def songs():
    album_ = Album(request.args.get("artist"), request.args.get("album"))

    return album_.to_dict()


@current_app.post("/edit_album")
def edit_album():
    album_ = Album(request.form.get("artist"), request.form.get("album"))

    for i in album_.songs:
        i.tag.album = request.form.get("new_name")
        i.tag.album_artist = request.form.get("new_album_artist")
        i.tag.artist = request.form.get("new_artist")

        i.tag.save()

    return ""


@current_app.post("/edit_tag")
def edit_tag():
    song_ = Song(Path(request.form.get("path")))
    song_.tag.title = request.form.get("new_name")
    song_.tag.album_artist = request.form.get("new_album_artist")
    song_.tag.artist = request.form.get("new_artist")
    song_.tag.album = request.form.get("new_album")
    song_.tag.track_num = request.form.get("new_track_num")

    song_.tag.lyrics.set(request.form.get("new_lyrics"))
    song_.tag.save()

    return ""


@current_app.post("/set_artwork")
def set_artwork():
    artist_ = Artist(request.form.get("artist"))
    artist_.set_artwork(request.form.get("album"), request.form.get("image_url"))

    return ""
