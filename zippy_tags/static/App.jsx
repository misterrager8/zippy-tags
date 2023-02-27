function Navbar() {
    const [theme, setTheme] = React.useState(localStorage.getItem('ZippyTags'));

    const changeTheme = (theme_) => {
        localStorage.setItem('ZippyTags', theme_);
        document.documentElement.setAttribute('data-theme', theme_);
        setTheme(theme_);
    }

    React.useEffect(() => {
        changeTheme(theme);
    }, []);

    return (
        <div className="d-flex justify-content-between p-2">
            <div className="btn-group btn-group-sm">
                <a className="btn btn-outline-secondary"><i className="bi bi-house-fill"></i></a>
                <a data-bs-target="#themes" data-bs-toggle="dropdown" className="btn btn-outline-secondary dropdown-toggle text-capitalize"><i className="bi bi-paint-bucket"></i> {theme}</a>
                <div id="themes" className="dropdown-menu text-center">
                    {theme !== 'light' && <a onClick={() => changeTheme('light')} className="small dropdown-item text-capitalize">light</a>}
                    {theme !== 'dark' && <a onClick={() => changeTheme('dark')} className="small dropdown-item text-capitalize">dark</a>}
                </div>
            </div>
        </div>
        );
}

function App() {
    const [artists, setArtists] = React.useState([]);
    const [albums, setAlbums] = React.useState([]);
    const [tracks, setTracks] = React.useState([]);
    const [track, setTrack] = React.useState([]);

    const [loading, setLoading] = React.useState(false);

    const getArtists = () => {
        setLoading(true);
        $.get('/get_artists', function(data) {
            setArtists(data.artists);
            setLoading(false);
        });
    }

    const getAlbums = (name) => {
        setLoading(true);
        $.get('/get_albums', {
            name: name
        }, function(data) {
            setAlbums(data.albums);
            setLoading(false);
        });
    }

    const getTracks = (artist, name) => {
        setLoading(true);
        $.get('/get_tracks', {
            artist: artist,
            name: name
        }, function(data) {
            setTracks(data.tracks);
            setLoading(false);
        });
    }

    const getTags = (artist, album, name) => {
        setLoading(true);
        $.get('/get_tags', {
            artist: artist,
            album: album,
            name: name
        }, function(data) {
            setTrack(data);
            setLoading(false);
        });
    }

    React.useEffect(() => {
        getArtists();
    }, []);

    React.useEffect(() => {
        setTracks([]);
    }, [albums]);

    React.useEffect(() => {
        setTrack([]);
    }, [tracks]);

    return (
        <div className="p-4">
            <Navbar/>
            {loading && <span className="spinner-border spinner-border-sm"></span>}
            <div className="row mt-3">
                <div className="col-2">
                    {artists.map((x, id) => (
                        <div key={id} className="text-truncate">
                            <a onClick={() => getAlbums(x)}><i className="bi bi-person-fill"></i> {x}</a>
                        </div>
                    ))}
                </div>
                <div className="col-2">
                    {albums.length !== 0 &&
                    <div>
                    {albums.map((x, id) => (
                        <div key={id} className="text-truncate">
                            <a onClick={() => getTracks(x.artist, x.name)} ><i className="bi bi-disc"></i> {x.name}</a>
                        </div>
                    ))}
                    </div>}
                </div>
                <div className="col-2">
                    {tracks.length !== 0 &&
                    <div>
                    {tracks.map((x, id) => (
                        <div key={id} className="text-truncate">
                            <a onClick={() => getTags(x.artist, x.album, x.name)}><i className="bi bi-music-note"></i> {x.name}</a>
                        </div>
                    ))}
                    </div>}
                </div>
                <div className="col-6">
                    {track.length !== 0 &&
                    <form className="">
                        <div><span className="fw-bold me-3">title</span> {track.title}</div>
                        <div><span className="fw-bold me-3">artist</span> {track.artist}</div>
                        <div><span className="fw-bold me-3">album</span> {track.album}</div>
                        <div><span className="fw-bold me-3">album_artist</span> {track.album_artist}</div>
                        <div><span className="fw-bold me-3">track_num</span> {track.track_num}</div>
                        <div><span className="fw-bold me-3">genre</span> {track.genre}</div>
                        <div>{track.lyrics}</div>
                    </form>}
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
