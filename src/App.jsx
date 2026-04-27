import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Instructions from "./components/Instructions/Instructions";
import "./App.css";

function App() {

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Instructions />} />
          {/* <Route path="/intro" element={<Opening />} /> */}
          {/* <Route path="/intro" element={<NavPage />} /> */}
          {/* <Route path="/home" element={<Content />} /> */}
          {/* <Route path="/end" element={<End />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
