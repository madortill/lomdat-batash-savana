import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./components/Content/Content.css";

import MobileBlocker from "./components/MobileBlocker/MobileBlocker";

const Instructions = lazy(() => import("./components/Instructions/Instructions"));
const Opening = lazy(() => import("./components/Opening/Opening"));
const NavPage = lazy(() => import("./components/NavPage/NavPage"));
const loadContent = () => import("./components/Content/ContentControl");
const Content = lazy(loadContent);
const End = lazy(() => import("./components/End/End"));

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 900);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  if (isMobile) {
    return <MobileBlocker />;
  }

  return (
    <div className="app">
      <Suspense fallback={<div className="loading">נטען</div>}>
        <Routes>
          <Route path="/" element={<Instructions />} />
          <Route path="/Opening" element={<Opening />} />
          <Route path="/NavPage" element={<NavPage />} />
          <Route path="/Content" element={<Content />} />
          <Route path="/End" element={<End />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;