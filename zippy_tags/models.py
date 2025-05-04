from . import config


class Artist:
    def __init__(self, name):
        self.name = name

    @property
    def path(self):
        return config.HOME_DIR / self.name

    @property
    def albums(self):
        return [Album(self.name, i.name) for i in self.path.iterdir() if i.is_dir()]

    @classmethod
    def all(cls):
        return sorted(
            [Artist(i.name) for i in config.HOME_DIR.iterdir() if i.is_dir()],
            key=lambda x: x.name,
        )

    @classmethod
    def search(cls, query: str):
        return [i for i in Artist.all() if query.lower() in i.name.lower()]

    def to_dict(self):
        return {
            "name": self.name,
            "path": str(self.path),
            "albums": [i.to_dict() for i in self.albums],
        }


class Album:
    def __init__(self, artist, name):
        self.artist = artist
        self.name = name

    @property
    def path(self):
        return config.HOME_DIR / self.artist / self.name

    @property
    def songs(self):
        return [
            Song(self.artist, self.name, i.name)
            for i in self.path.iterdir()
            if i.is_file() and (not i.name in [".DS_Store"])
        ]

    def to_dict(self):
        return {
            "artist": self.artist,
            "name": self.name,
            "path": str(self.path),
            "songs": [i.to_dict() for i in self.songs],
        }


class Song:
    def __init__(self, artist, album, name):
        self.artist = artist
        self.album = album
        self.name = name

    @property
    def path(self):
        return config.HOME_DIR / self.artist / self.album / self.name

    def to_dict(self):
        return {
            "artist": self.artist,
            "album": self.album,
            "name": self.name,
            "path": str(self.path),
        }
