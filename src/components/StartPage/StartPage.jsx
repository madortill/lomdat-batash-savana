import styles from "./StartPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import backButton from "../../assets/img/backBtn.svg";
import savannaCard from "../../assets/img/savannaCard.png";
import letsStartBtn from "../../assets/img/letsStart.svg";

const StartPage = ({ onSendData }) => {
    const [showAbout, setShowAbout] = useState(false);
    const [infoSymbol, setInfoSymbol] = useState("i");
    const navigate = useNavigate();

    const toggleAbout = () => {
        setShowAbout((prev) => !prev);
        setInfoSymbol((prev) => (prev === "i" ? "x" : "i"));
    };

    const nextPage = () => {
        onSendData(1);
    };

    return (
        <div className={styles.StartPage}>
            <div className="backBtnDiv">
                <img src={backButton}
                    className="back-btn"
                    onClick={() => {
                        window.location.href = "https://madortill.github.io/batash-package/";
                    }} alt="חזרה" />
                <p className={styles.backBtnText}>חזרה לבחירת הרכב</p>
            </div>

            <div onClick={toggleAbout} className={styles.aboutBtnContainer}>
                <button className={styles["about-btn"]}>
                    {infoSymbol}
                </button>
                <p>אודות</p>
            </div>

            <div className={`${styles["div-about"]} ${showAbout ? styles["fade-in"] : styles["fade-out"]}`}>
                {showAbout && (
                    <>
                        <h3 className={styles["list-text-about"]}>מפתחת ראשית:</h3>
                        <p className={styles["list-text-about"]}>רב"ט צאלה בלמקר</p>
                        <h3 className={styles["list-text-about"]}>גרפיקה:</h3>
                        <p className={styles["list-text-about"]}>רב"ט צאלה בלמקר</p>
                        <h3 className={styles["list-text-about"]}>מומחי תוכן:</h3>
                        <p className={styles["list-text-about"]}>רס"ל עדן מאיר</p>
                        <p className={styles["list-text-about"]}>רנ"ג יוסי אלוני</p>
                        <h3 className={styles["list-text-about"]}>רמ"ד טי"ל:</h3>
                        <p className={styles["list-text-about"]}>קטיה מדבדב</p>
                        <h3 className={styles["list-text-about"]}>גרסה:</h3>
                        <p className={styles["list-text-about"]}>יוני 2026</p>
                    </>
                )}
            </div>

            <div className={styles["start-main-content"]}>
                <p className={styles["start-main-content-text"]}>סוואנה</p>
                <img src={savannaCard} alt="savannaCard" className={styles.davidCard} onClick={() => navigate("/OpeningInstructions")}/>
            </div>

            <img src={letsStartBtn} alt="startBtn" className={styles.letsStartBtn} onClick={nextPage} />
        </div>
    );
};

export default StartPage;