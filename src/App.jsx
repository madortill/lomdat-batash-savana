import { lazy, Suspense } from "react";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
const Instructions = lazy(() => import("./components/Instructions/Instructions"));
const Opening = lazy(() => import("./components/Opening/Opening"));
const NavPage = lazy(() => import("./components/NavPage/NavPage"));
const Content = lazy(() => import("./components/Content/ContentControl"));
const End = lazy(() => import("./components/End/End"));

import "./App.css";
import "./components/Content/Content.css";

function App() {

  return (
    <>
      <div className="app">
        <Suspense fallback={<div className="loading">נטען</div>}>
          <Routes>
            <Route path="/" element={<Instructions />} />
            <Route path="/Opening" element={<Opening />} />
            <Route path="/NavPage" element={<NavPage />} />
            <Route path="/Content" element={<Content />} />
            <Route path="/end" element={<End />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
