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
                <a style={{ color:'darkorange' }} className="btn border-0 me-3"><i className="bi bi-tags"></i> Zippy Tags</a>
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

    const [artist, setArtist] = React.useState([]);
    const [album, setAlbum] = React.useState([]);
    const [track, setTrack] = React.useState([]);

    const [loading, setLoading] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

    const getArtists = () => {
        setLoading(true);
        $.get('/get_artists', function(data) {
            setArtists(data.artists);
            setLoading(false);
        });
    }

    const getArtist = (name) => {
        setLoading(true);
        $.get('/get_artist', {
            name: name
        }, function(data) {
            setArtist(data);
            setLoading(false);
        });
    }

    const getAlbum = (artist, name) => {
        setLoading(true);
        $.get('/get_album', {
            artist: artist,
            name: name
        }, function(data) {
            setAlbum(data);
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

    const setTags = (e, artist, album, name) => {
        e.preventDefault();
        setLoading(true);
        $.post('/set_tags', {
            artist: artist,
            album: album,
            name: name,
            new_title: $('#title').val(),
            new_album: $('#album').val(),
            new_album_artist: $('#album_artist').val(),
            new_track_num: $('#track_num').val(),
            new_genre: $('#genre').val()
        }, function(data) {
            setTrack(data);
            setLoading(false);
            setSaved(true);
            setTimeout(function() { setSaved(false); }, 1500);
        });
    }

    React.useEffect(() => {
        getArtists();
    }, []);

    React.useEffect(() => {
        setAlbum([]);
    }, [artist]);

    React.useEffect(() => {
        setTrack([]);
    }, [album]);

    return (
        <div className="p-4">
            <Navbar/>
            {loading && <span className="spinner-border spinner-border-sm"></span>}
            <div className="row mt-3">
                <div className="col-2">
                    <p className="heading mb-2 small fst-italic fw-light">{artists.length} artists</p>
                    {artists.map((x, id) => (
                        <div key={id} className="text-truncate hover" title={x.name}>
                            <a onClick={() => getArtist(x)}><i className="bi bi-person-fill me-2"></i> {x}</a>
                        </div>
                    ))}
                </div>
                <div className="col-2">
                    {artist.length !== 0 &&
                    <div className="sticky-top">
                    <p className="heading m-0">{artist.name}</p>
                    <p className="heading mb-2 small fst-italic fw-light">{artist.albums.length} albums</p>
                    {artist.albums.map((x, id) => (
                        <div key={id} className="text-truncate hover" title={x.name}>
                            <a onClick={() => getAlbum(x.artist, x.name)} ><i className="bi bi-disc me-2"></i> {x.name}</a>
                        </div>
                    ))}
                    </div>}
                </div>
                <div className="col-2">
                    {album.length !== 0 &&
                    <div className="sticky-top">
                    <p className="heading m-0">{album.name}</p>
                    <p className="heading mb-2 small fst-italic fw-light">{album.tracks.length} tracks</p>
                    {album.tracks.map((x, id) => (
                        <div key={id} className="text-truncate hover" title={x.name}>
                            <a onClick={() => getTags(x.artist, x.album, x.name)}><i className="bi bi-music-note me-2"></i> {x.name}</a>
                        </div>
                    ))}
                    </div>}
                </div>
                <div className="col-6">
                    {track.length !== 0 &&
                    <form onSubmit={(e) => setTags(e, track.artist,track.album,track.name) } className="sticky-top">
                        <div className="form-floating mb-1">
                            <input id="title" autoComplete="off" className="form-control form-control-sm border-0" defaultValue={track.title} key={track.title} />
                            <label for="title">Title</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input id="album" autoComplete="off" className="form-control form-control-sm border-0" defaultValue={track.album} key={track.album} />
                            <label for="album">Album</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input id="album_artist" autoComplete="off" className="form-control form-control-sm border-0" defaultValue={track.album_artist} key={track.album_artist} />
                            <label for="album_artist">Album Artist</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input type="number" id="track_num" autoComplete="off" className="form-control form-control-sm border-0" defaultValue={track.track_num} key={track.track_num} />
                            <label for="track_num">Track Number</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input id="genre" autoComplete="off" className="form-control form-control-sm border-0" defaultValue={track.genre} key={track.genre} />
                            <label for="genre">Genre</label>
                        </div>
                        <div className="form-floating mb-1">
                            <textarea id="lyrics" key={'lyrics' + track.title} rows="20" className="form-control form-control-sm border-0" defaultValue={track.lyrics}></textarea>
                            <label for="lyrics">Lyrics</label>
                        </div>
                        <button type="submit" className="btn btn-sm btn-outline-success w-100"><i className={'bi bi-' + (saved ? 'check-lg' : 'save2')}></i> {saved ? 'Saved.' : 'Save'}</button>
                    </form>}
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
