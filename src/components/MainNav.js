import { useContext } from "react";

import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";
import { LoadingContext, ThemeContext } from "../pages/Home";
import { Link, useLocation } from "react-router-dom";
import { useArtists } from "../hooks";
import $ from "jquery";

export function MainNav() {
  const [theme, setTheme] = useContext(ThemeContext);
  const [loading, setLoading] = useContext(LoadingContext);
  const { artists, setArtists } = useArtists();
  const location = useLocation();

  const search = (e) => {
    e.preventDefault();
    $.post(
      "/search_artists",
      {
        query: $("#search").val(),
      },
      function (data) {
        setArtists(data.results);
        e.target.reset();
      }
    );
  };

  return (
    <>
      <div>
        <ButtonGroup size="sm">
          <Button
            outline
            className="dropdown-toggle"
            data-bs-target="#artists"
            data-bs-toggle="dropdown"
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : (
              <i
                style={{ color: "darkorange" }}
                className="bi bi-tags-fill me-2"
              ></i>
            )}
            {`zippyTags${decodeURI(location.pathname)}`}
          </Button>
          <div className="dropdown-menu" id="artists">
            <Link className="btn btn-sm btn-outline-primary w-100 mb-2" to="/">
              <i className="bi bi-house-fill me-2"></i>
              Home
            </Link>
            <form
              className="input-group input-group-sm p-2"
              onSubmit={(e) => search(e)}
            >
              <input
                id="search"
                autoComplete="off"
                className="form-control"
                placeholder="Search Artists"
              />
              <Button color="primary" outline>
                <i className="bi bi-search"></i>
              </Button>
            </form>
            {artists.map((x) => (
              <Link className="dropdown-item small" to={`/${x.name}`}>
                <i className="bi bi-person-fill me-2"></i>
                {x.name}
              </Link>
            ))}
          </div>
        </ButtonGroup>
        <ButtonGroup className="float-end" size="sm">
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-capitalize"
            outline
          >
            <i className="bi bi-paint-bucket me-2"></i>
            {theme}
          </Button>
          <Button outline active={location.pathname === "/settings"}>
            <Link to="/settings">
              <i className="bi bi-gear me-2"></i>Settings
            </Link>
          </Button>
          <a
            className="btn btn-outline-secondary"
            href="https://github.com/misterrager8/zippy-tags"
            target="_blank"
          >
            <i className="bi bi-info-circle me-2"></i>About
          </a>
        </ButtonGroup>
      </div>
    </>
  );
}
