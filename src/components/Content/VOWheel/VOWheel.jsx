import { useEffect, useState, useRef } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOWheel.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import wheelVideo from "../../../assets/video/wheelChange.mp4";

const Wheel = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();
    const videoRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [videoEnded, setVideoEnded] = useState(false);

    if (!data || !data.general || !data.cWheel) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const wheelTitle = data.cWheel[0].text;

    // הפעלה / עצירה של הסרטון
    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // עדכון הזמן הנוכחי במהלך הניגון
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrentTime(videoRef.current.currentTime);
    };

    // טעינת אורך הסרטון כשהמדיה מוכנה
    const handleLoadedMetadata = () => {
        if (!videoRef.current) return;
        setDuration(videoRef.current.duration);
    };

    // גרירה או לחיצה על ציר הזמן (Timeline)
    const handleTimelineChange = (e) => {
        if (!videoRef.current) return;
        const newTime = parseFloat(e.target.value);
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // אירוע סיום הסרטון - פותח את האפשרות להתקדם
    const handleVideoEnded = () => {
        setIsPlaying(false);
        setVideoEnded(true);
        onComplete?.(); // מודיע לקומפוננטה האם שהסרטון הסתיים
    };

    // פורמט זמן קריא (MM:SS) לטובת התצוגה על הציר
    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return "00:00";
        const mins = Math.floor(timeInSeconds / 60);
        const secs = Math.floor(timeInSeconds % 60);
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // כפתור הבא יאופשר אם canProceed אמת מהאב, או אם המשתמש סיים לצפות כעת
    const isNextEnabled = canProceed || videoEnded;

    return (
        <div className={styles.contentPage}>

            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} alt="חזרה" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{wheelTitle}</h1>

            <div className={styles.videoContainer}>
                <video
                    ref={videoRef}
                    src={wheelVideo}
                    className={styles.videoPlayer}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleVideoEnded}
                    onClick={togglePlay} // לחיצה על הוידאו עצמו תעצור/תפעיל
                />

                {/* כפתור פליי גדול שמופיע באמצע כשהסרטון עצור */}
                {!isPlaying && (
                    <button className={styles.centerPlayButton} onClick={togglePlay} aria-label="נגן">
                        <div className={styles.playIcon}></div>
                    </button>
                )}

                {/* סרגל השליטה התחתון */}
                <div className={styles.controlsBar}>
                    <button className={styles.playPauseBtn} onClick={togglePlay}>
                        {isPlaying ? (
                            <div className={styles.pauseIcon}></div>
                        ) : (
                            <div className={styles.playIconSmall}></div>
                        )}
                    </button>

                    <div className={styles.timelineContainer}>
                        <span className={styles.timeLabel}>{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleTimelineChange}
                            className={styles.timelineSlider}
                            style={{
                                background: `linear-gradient(to left, #E69907 0%, #E69907 ${(currentTime / (duration || 1)) * 100
                                    }%, #cccccc ${(currentTime / (duration || 1)) * 100}%, #cccccc 100%)`
                            }}
                        />
                        <span className={styles.timeLabel}>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            <div className={styles.gravelRoad}></div>

            <div
                className={`${isNextEnabled ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`}
                onClick={isNextEnabled ? onNext : undefined}
            >
                <p className={isNextEnabled ? "next-btn-text" : "next-btn-text-disabled"}>
                    {nextBtn}
                </p>
            </div>

        </div>
    );
};

export default Wheel;