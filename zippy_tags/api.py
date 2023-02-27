from flask import current_app, render_template, request

from .models import Album, Artist, Track


@current_app.get("/")
def index():
    return render_template("index.html")


@current_app.get("/get_artists")
def get_artists():
    return dict(artists=[i.name for i in Artist.all()])


@current_app.get("/get_albums")
def get_albums():
    artist_ = Artist(request.args.get("name"))
    return dict(albums=[i.to_dict() for i in artist_.albums])


@current_app.get("/get_tracks")
def get_tracks():
    album_ = Album(request.args.get("artist"), request.args.get("name"))
    return dict(tracks=[i.to_dict() for i in album_.tracks])


@current_app.get("/get_tags")
def get_tags():
    track_ = Track(
        request.args.get("artist"), request.args.get("album"), request.args.get("name")
    )
    return track_.tags()


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
    return track_.tags()
