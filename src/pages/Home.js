import { createContext, useEffect, useState } from "react";
import { MainNav } from "../components/MainNav";
import { Outlet } from "react-router-dom";

export const ThemeContext = createContext();
export const LoadingContext = createContext();

function Home() {
  const [theme, setTheme] = useState(
    localStorage.getItem("zippy-tags") || "light"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("zippy-tags", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <LoadingContext.Provider value={[loading, setLoading]}>
        <ThemeContext.Provider value={[theme, setTheme]}>
          <div className="p-3">
            <MainNav />
            <div className="px-2">
              <Outlet />
            </div>
          </div>
        </ThemeContext.Provider>
      </LoadingContext.Provider>
      <small className="footer fixed-bottom opacity-50 p-2">v2023.04.24</small>
    </>
  );
}

export default Home;
