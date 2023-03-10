from pathlib import Path

from flask import current_app, render_template, request

from .models import Artist, Song


@current_app.get("/")
def index():
    return render_template("index.html")


@current_app.get("/artists")
def artists():
    return dict(artists_=[i.name for i in Artist.all()])


@current_app.get("/albums")
def albums():
    artist_ = Artist(request.args.get("name"))
    return dict(albums_=artist_.albums, artist=artist_.name)


@current_app.get("/songs")
def songs():
    artist_ = Artist(request.args.get("artist"))
    album_ = request.args.get("album")
    return dict(songs_=[i.to_dict() for i in artist_.songs(album_)], album=album_)


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
