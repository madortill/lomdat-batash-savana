import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./VOGearbox.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import gearboxBg1 from "../../../assets/img/gearboxBg1.svg";

const Gearbox = ({ onNext, onBack }) => {
    const { data } = useData();

    if (!data || !data.general || !data.cVOGearbox) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const cVOGearboxTitle = data.cVOGearbox[0].text;
    const cVOGearTopTitle = data.cVOGearbox[1].text;
    const cVOGearTop = data.cVOGearbox[2].text;
    const cVOGearRight = data.cVOGearbox[5].text;
    const cVOGearLeftTitle = data.cVOGearbox[3].text;
    const cVOGearLeft = data.cVOGearbox[4].text;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} alt="חזרה" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{cVOGearboxTitle}</h1>

            <div className={styles.imgDiv}>
                <img src={gearboxBg1} alt="inside view of savanna car" className={styles.gearboxBg} />

                <div className={styles.textboxTop}>
                    <h2 className={styles.regionTitle}>{cVOGearTopTitle}</h2>
                    <p className={styles.regionText}>{cVOGearTop}</p>
                </div>

                <div className={styles.textboxRight}>
                    <p className={styles.regionText}>{cVOGearRight}</p>
                </div>

                <div className={styles.textboxLeft}>
                    <h2 className={styles.regionTitle}>{cVOGearLeftTitle}</h2>
                    <p className={styles.regionText}>{cVOGearLeft}</p>
                </div>
            </div>

            <div className={`next-btn ${styles.nextBtn}`} onClick={onNext}>
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Gearbox;