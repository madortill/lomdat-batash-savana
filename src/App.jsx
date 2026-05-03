import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Instructions from "./components/Instructions/Instructions";
import Opening from "./components/Opening/Opening";
import NavPage from "./components/NavPage/NavPage";
import Content from "./components/Content/ContentControl";

import "./App.css";

function App() {

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Instructions />} />
          <Route path="/Opening" element={<Opening />} />
          <Route path="/NavPage" element={<NavPage />} />
          <Route path="/Content" element={<Content />} />
          {/* <Route path="/end" element={<End />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
