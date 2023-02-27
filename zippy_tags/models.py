from pathlib import Path

import eyed3

from . import config


class Artist(object):
    def __init__(self, name):
        self.name = name

    @property
    def albums(self):
        return [
            Album(self.name, i.name)
            for i in (config.HOME_DIR / self.name).iterdir()
            if i.is_dir()
        ]

    @classmethod
    def all(cls):
        return [Artist(i.name) for i in config.HOME_DIR.iterdir() if i.is_dir()]


class Album(object):
    def __init__(self, artist, name):
        self.artist = artist
        self.name = name

    @property
    def tracks(self):
        return [
            Track(self.artist, self.name, i.name)
            for i in (config.HOME_DIR / self.artist / self.name).iterdir()
        ]

    def to_dict(self):
        return dict(artist=self.artist, name=self.name)


class Track(object):
    def __init__(self, artist, album, name):
        self.artist = artist
        self.album = album
        self.name = name

    def tags(self):
        tag_ = eyed3.load(
            Path(config.HOME_DIR / self.artist / self.album / self.name)
        ).tag
        return dict(
            title=tag_.title,
            name=self.name,
            artist=tag_.artist,
            album=tag_.album,
            album_artist=tag_.album_artist,
            track_num=tag_.track_num[0],
            lyrics="\n".join([i.text for i in tag_.lyrics]),
            genre=tag_.genre.name if tag_.genre else "",
        )

    def set_tags(
        self, new_title, new_album, new_album_artist, new_track_num, new_genre
    ):
        tag_ = eyed3.load(
            Path(config.HOME_DIR / self.artist / self.album / self.name)
        ).tag
        tag_.title = new_title
        tag_.album = new_album
        tag_.album_artist = new_album_artist
        tag_.track_num = new_track_num
        tag_.genre = new_genre
        tag_.save()

    def to_dict(self):
        return dict(artist=self.artist, album=self.album, name=self.name)
