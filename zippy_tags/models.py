from itertools import groupby
from pathlib import Path

import eyed3

from . import config


class Artist(object):
    def __init__(self, name):
        self.name = name

    @property
    def songs(self):
        return sorted(
            [Song(i) for i in (config.HOME_DIR / self.name).glob("**/*.mp3")],
            key=lambda x: x.album,
        )

    @property
    def albums(self):
        grouped = []
        for x, y in groupby(self.songs, lambda x: x.album):
            grouped.append(x)

        return [Album(self.name, i) for i in grouped]

    @classmethod
    def all(cls):
        return [Artist(i.name) for i in config.HOME_DIR.iterdir() if i.is_dir()]


class Album(object):
    def __init__(self, artist, name):
        self.artist = artist
        self.name = name

    @property
    def songs(self):
        _ = filter(lambda x: x.album == self.name, Artist(self.artist).songs)
        return sorted(_, key=lambda y: y.track_num)

    def set_artwork(self, image_url):
        picture = open(image_url, "rb").read()

        for i in self.songs:
            i.tag.images.set(3, img_data=picture, mime_type="image/jpeg")
            i.tag.save()

    def to_dict(self):
        return dict(
            artist=self.artist, name=self.name, songs=[i.to_dict() for i in self.songs]
        )


class Song(object):
    def __init__(self, path: Path):
        self.path = path
        self.tag = eyed3.load(self.path).tag

    @property
    def name(self):
        return self.tag.title

    @property
    def artist(self):
        return self.tag.artist

    @property
    def album(self):
        return self.tag.album

    @property
    def album_artist(self):
        return self.tag.album_artist

    @property
    def track_num(self):
        return self.tag.track_num[0]

    @property
    def lyrics(self):
        return "\n".join([i.text for i in self.tag.lyrics])

    @property
    def genre(self):
        return self.tag.genre.name if self.tag.genre else ""

    def to_dict(self):
        return dict(
            path=str(self.path),
            name=self.name,
            artist=self.artist,
            album=self.album,
            album_artist=self.album_artist,
            track_num=self.track_num,
            lyrics=self.lyrics,
            genre=self.genre,
        )
