import React, { createContext, useContext, useRef, useState } from "react";
import text from "../data/text.json";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentJSON, setCurrentJSON] = useState("he");
  const [isNarrationOn, setIsNarrationOn] = useState(false);
  const audioRef = useRef(null);

  const switchJSON = (key) => setCurrentJSON(key);

  // 🔊 הדלקה / כיבוי קריינות
  const toggleNarration = () => {
    setIsNarrationOn((prev) => !prev);
    stopAudio();
  };

  // ▶️ ניגון אודיו
  const playAudio = (src) => {
    if (!isNarrationOn || !src) return;

    stopAudio();

    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play();
  };

  // ⏹️ עצירה
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <DataContext.Provider
      value={{
        data: text[currentJSON],
        switchJSON,
        isNarrationOn,
        toggleNarration,
        currentJSON,
        playAudio,
        stopAudio,
        currentJSON,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);