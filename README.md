# zippy-tags
---

Zippy-Tags is a simple browser-based application for managing ID3 tags in MP3 files. It allows you to view and edit tags such as title, artist, album, lyrics, and artwork, as well as add new tags or remove existing ones.

![](/docs/screenshot1.png)

![](/docs/screenshot2.png)

![](/docs/screenshot3.png)

### Installation / Usage

<pre>

# Clone this repo
git clone https://github.com/misterrager8/zippy-tags.git

# Install all dependencies in the package.json file
npm install .

# Setup configuration
vi api/.env

# Set up these environment variables. All are required
home_dir=[]
GENIUS_ACCESS_TOKEN=[]
client_id=[]
user_agent=[]
client_secret=[]

# Launch the app in browser
npm run dev

</pre>

### Tools Used

- [eyeD3](https://github.com/nicfit/eyeD3) - Python tool for working with audio files, specifically MP3 files containing ID3 metadata
- [lyricsgenius](https://github.com/johnwmillr/LyricsGenius) - simple interface to the song, artist, and lyrics data stored on Genius.com

### Contributing

Any suggestions, tips, or advice? Just PM me or fork the repository and submit a pull request. I welcome all suggestions, bug reports, feature requests, and code contributions.

### Author

[C.N. Joseph (misterrager8)](https://github.com/misterrager8)

### License

Zippy-Tags is licensed under the MIT License. See the LICENSE file for more information.

### Acknowledgements

Much appreciation towards the authors of *all* the dependencies and tools mentioned above.
