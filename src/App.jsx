import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import InstructionsControl from "./components/InstructionsControl";
import "./App.css";
import backBtn from "./assets/img/backBtn.svg";

function App() {

  return (
    <>
      <div className="app">
        <img src={backBtn} className="back-btn"/>
        <Routes>
          <Route path="/" element={<InstructionsControl />} />
          {/* <Route path="/intro" element={<Opening />} /> */}
          {/* <Route path="/home" element={<Content />} /> */}
          {/* <Route path="/end" element={<End />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
