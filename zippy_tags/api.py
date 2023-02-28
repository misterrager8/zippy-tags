from flask import current_app, render_template, request

from .models import Album, Artist, Track


@current_app.get("/")
def index():
    return render_template("index.html")


@current_app.get("/get_artists")
def get_artists():
    return dict(artists=[i.name for i in Artist.all()])


@current_app.get("/get_artist")
def get_artist():
    artist_ = Artist(request.args.get("name"))
    return artist_.to_dict()


@current_app.get("/get_album")
def get_album():
    album_ = Album(request.args.get("artist"), request.args.get("name"))
    return album_.to_dict()


@current_app.get("/get_tags")
def get_tags():
    track_ = Track(
        request.args.get("artist"), request.args.get("album"), request.args.get("name")
    )
    return track_.tags


@current_app.post("/set_tags")
def set_tags():
    track_ = Track(
        request.form.get("artist"), request.form.get("album"), request.form.get("name")
    )
    track_.set_tags(
        request.form.get("new_title"),
        request.form.get("new_album"),
        request.form.get("new_album_artist"),
        request.form.get("new_track_num"),
        request.form.get("new_genre"),
    )
    return track_.tags
