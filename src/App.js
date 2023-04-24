import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Artist } from "./pages/Artist";
import { Album } from "./pages/Album";
import { Song } from "./pages/Song";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":artist_" element={<Artist />}>
              <Route path=":album_" element={<Album />}>
                <Route path=":name" element={<Song />} />
              </Route>
            </Route>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
