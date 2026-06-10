import styles from "./StartPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import backButton from "../../assets/img/backBtn.svg";
import savannaCard from "../../assets/img/savannaCard.png";
import letsStartBtn from "../../assets/img/letsStart.svg";

const StartPage = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [infoSymbol, setInfoSymbol] = useState("i");
    const navigate = useNavigate();

    const toggleAbout = () => {
        setShowAbout((prev) => !prev);
        setInfoSymbol((prev) => (prev === "i" ? "x" : "i"));
    };

    const nextPage = () => {
        navigate("/OpeningInstructions");
    };

    return (
        <div className={styles.StartPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={() => { window.location.href = "https://madortill.github.io/batash-package/"; }} alt="חזרה" />
                <p className={styles.backBtnText}>חזרה לבחירת הרכב</p>
            </div>

            <div onClick={toggleAbout} className={styles.aboutBtnContainer}>
                <button className={styles.aboutBtn}>{infoSymbol}</button>
                <p>אודות</p>
            </div>

            <div className={`${styles.divAbout} ${showAbout ? styles.fadeIn : styles.fadeOut}`}>
                {showAbout && (
                    <>
                        <h3 className={styles.listTextAbout}>מפתחת ראשית:</h3>
                        <p className={styles.listTextAbout}>רב"ט צאלה בלמקר</p>

                        <h3 className={styles.listTextAbout}>גרפיקה:</h3>
                        <p className={styles.listTextAbout}>רב"ט צאלה בלמקר</p>

                        <h3 className={styles.listTextAbout}>מומחי תוכן:</h3>
                        <p className={styles.listTextAbout}>רס"ל עדן מאיר</p>
                        <p className={styles.listTextAbout}>רנ"ג יוסי אלוני</p>

                        <h3 className={styles.listTextAbout}>רמ"ד טי"ל:</h3>
                        <p className={styles.listTextAbout}>קטיה מדבדב</p>

                        <h3 className={styles.listTextAbout}>גרסה:</h3>
                        <p className={styles.listTextAbout}>יוני 2026</p>
                    </>
                )}
            </div>

            <div className={styles.startMainContent}>
                <p className={styles.startMainContentText}>סוואנה</p>
                <img src={savannaCard} alt="savannaCard" className={styles.davidCard} />
            </div>

            <img src={letsStartBtn} alt="startBtn" className={styles.letsStartBtn} onClick={nextPage} />
        </div>
    );
};

export default StartPage;