function App() {
    const [theme, setTheme] = React.useState(localStorage.getItem('ZippyTags'));

    const [loading, setLoading] = React.useState(false);
    const [editing, setEditing] = React.useState(false);

    const [artists, setArtists] = React.useState([]);
    const [artist, setArtist] = React.useState([]);

    const [albums, setAlbums] = React.useState([]);
    const [album, setAlbum] = React.useState([]);

    const [songs, setSongs] = React.useState([]);

    const changeTheme = (theme_) => {
        localStorage.setItem('ZippyTags', theme_);
        document.documentElement.setAttribute('data-theme', theme_);
        setTheme(theme_);
    }

    const getArtists = () => {
        setLoading(true);
        $.get('/artists', function(data) {
            setArtists(data.artists_);
            setLoading(false);
        });
    }

    const getAlbums = (name) => {
        setLoading(true);
        $.get('/albums', {
            name: name
        }, function(data) {
            setArtist(data.artist);
            setAlbums(data.albums_);
            setLoading(false);
        });
    }

    const getSongs = (album) => {
        setLoading(true);
        $.get('/songs', {
            artist: artist,
            album: album
        }, function(data) {
            setAlbum(data);
            setSongs(data.songs);
            setLoading(false);
        });
    }

    const editAlbum = (e) => {
        e.preventDefault();
        setLoading(true);
        $.post('/edit_album', {
            artist: artist,
            album: album.name,
            new_name: $('#name').val(),
            new_album_artist: $('#album-artist').val(),
            new_artist: $('#artist').val(),
        }, function(data) {
            setLoading(false);
        });
    }

    const setArtwork = (e) => {
        e.preventDefault();
        setLoading(true);
        $.post('/set_artwork', {
            artist: artist,
            album: album.name,
            image_url: $('#image-url').val()
        }, function(data) {
            setLoading(false);
        });
    }

    React.useEffect(() => {
        getArtists();
        changeTheme(theme);
    }, []);

    React.useEffect(() => {
        artist.length == 0 && setAlbums([]);
        setAlbum([]);
        setSongs([]);
    }, [artist]);

    return (
        <div className="p-4">
            <nav className="py-3 sticky-top">
                <a onClick={() => setArtist([])} className="btn btn-sm text-secondary">{loading ? <span className="spinner-border spinner-border-sm"></span> : <i className="bi bi-tags" style={{ color:'darkorange' }}></i>} ZippyTags</a>
                <a data-bs-toggle="dropdown" data-bs-target="#themes" className="btn btn-sm text-secondary text-capitalize dropdown-toggle"><i className="bi bi-paint-bucket"></i> {theme}</a>
                <div className="dropdown-menu text-center" id="themes">
                    {theme !== 'light' && <a className="dropdown-item text-capitalize small" onClick={() => changeTheme('light')}>light</a>}
                    {theme !== 'dark' && <a className="dropdown-item text-capitalize small" onClick={() => changeTheme('dark')}>dark</a>}
                </div>
                <a className="btn btn-sm text-secondary"><i className="bi bi-gear"></i> Settings</a>
                <a href="https://github.com/misterrager8/zippy-tags" target="_blank" className="btn btn-sm text-secondary"><i className="bi bi-info-circle"></i> About</a>
            </nav>
            <div className="row">
                <div className="col-2">
                    {artists.map((x, id) => (
                        <div className={'px-2 hover text-truncate ' + (x === artist && 'selected')} key={id}>
                            <a onClick={() => getAlbums(x)}><i className="bi bi-person me-1"></i> {x}</a>
                        </div>
                    ))}
                </div>
                <div className="col-3">
                    <div className="sticky-top">
                        <br/>
                        <br/>
                        {artist.length !== 0 && <div className="fs-4 heading mb-3 text-truncate">{artist}</div>}
                        {albums.map((x, id) => (
                            <div key={id} className={'px-2 hover text-truncate ' + (x.name === album.name && 'selected')}>
                                <a onClick={() => getSongs(x.name)}><i className="bi bi-disc me-1"></i> {x.name}</a>
                            </div>
                        ) )}
                    </div>
                </div>
                <div className="col-7">
                    <div className="sticky-top">
                        <br/>
                        <br/>
                        {album.length !== 0 && (
                            <div>
                                <div className="fs-4 heading text-truncate">{album.name}</div>
                                <a onClick={() => setEditing(!editing)} className="btn btn-sm btn-outline-secondary my-3"><i className="bi bi-pen"></i> Edit Album</a>
                                {editing &&
                                <form className="mb-3" onSubmit={(e) => editAlbum(e)}>
                                    <input autoComplete="off" className="form-control form-control-sm mb-1" placeholder="Name" id="name"/>
                                    <input autoComplete="off" className="form-control form-control-sm mb-1" placeholder="Artist Album" id="album-artist"/>
                                    <input autoComplete="off" className="form-control form-control-sm mb-1" placeholder="Artist" id="artist"/>
                                    <button type="submit" className="btn btn-sm btn-outline-success">Edit Album</button>
                                </form>}
                                <div className="ps-2 row text-muted small">
                                    <div className="col-1 text-truncate">#</div>
                                    <div className="col-11 text-truncate">Name</div>
                                </div>
                            </div>
                        )}
                        {songs.map((x, id) => (<SongItem item={x} id={id} key={id}/>) )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SongItem(props) {
    const [selected, setSelected] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

    const editTag = (e) => {
        e.preventDefault();
        $.post('/edit_tag', {
            path: props.item.path,
            new_name: $('#name-' + props.id).val(),
            new_album_artist: $('#album-artist-' + props.id).val(),
            new_artist: $('#artist-' + props.id).val(),
            new_album: $('#album-' + props.id).val(),
            new_track_num: $('#track-num-' + props.id).val(),
            new_lyrics: $('#lyrics-' + props.id).val()
        }, function(data) {
            setSaved(true);
            setTimeout(function() { setSaved(false); }, 1500);
        });
    }

    return (
        <div className={'px-2 hover ' + (selected && 'selected py-2 my-2')}>
            <a onClick={() => setSelected(!selected)} className={'row ' + (selected && 'fst-italic')}>
                <div className="col-1 text-truncate">{props.item.track_num}.</div>
                <div className="col-11 text-truncate">{props.item.name}</div>
            </a>
            {selected &&
                <form className="my-2" onSubmit={(e) => editTag(e)}>
                    <button type="submit" className="btn btn-sm btn-primary w-100"><i className={'bi bi-' + (saved ? 'check-lg' : 'save2')}></i> Save Changes</button>
                    <div className="mt-2">
                        <div className="form-floating my-1">
                            <input key={props.item.name} id={'name-' + props.id} defaultValue={props.item.name} autoComplete="off" className="form-control form-control-sm border-0"/>
                            <label htmlFor={'name' + props.id} className="small text-secondary">Name</label>
                        </div>
                        <div className="form-floating my-1">
                            <input type="number" key={props.item.track_num} id={'track-num-' + props.id} defaultValue={props.item.track_num} autoComplete="off" className="form-control form-control-sm border-0"/>
                            <label htmlFor={'track-num-' + props.id} className="small text-secondary">Track Num</label>
                        </div>
                        <div className="form-floating my-1">
                            <input key={props.item.artist} id={'artist-' + props.id} defaultValue={props.item.artist} autoComplete="off" className="form-control form-control-sm border-0"/>
                            <label htmlFor={'artist-' + props.id} className="small text-secondary">Artist</label>
                        </div>
                        <div className="form-floating my-1">
                            <input key={props.item.album_artist} id={'album-artist-' + props.id} defaultValue={props.item.album_artist} autoComplete="off" className="form-control form-control-sm border-0"/>
                            <label htmlFor={'album-artist-' + props.id} className="small text-secondary">Album Artist</label>
                        </div>
                        <div className="form-floating my-1">
                            <input key={props.item.album} id={'album-' + props.id} defaultValue={props.item.album} autoComplete="off" className="form-control form-control-sm border-0"/>
                            <label htmlFor={'album-' + props.id} className="small text-secondary">Album</label>
                        </div>
                        <div className="form-floating my-1">
                            <input key={props.item.genre} id={'genre-' + props.id} defaultValue={props.item.genre} autoComplete="off" className="form-control form-control-sm border-0"/>
                            <label htmlFor={'genre-' + props.id} className="small text-secondary">Genre</label>
                        </div>
                        <textarea rows="20" key={props.item.lyrics} id={'lyrics-' + props.id} defaultValue={props.item.lyrics} className="form-control form-control-sm border-0 my-1"></textarea>
                    </div>
                </form>
            }
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
