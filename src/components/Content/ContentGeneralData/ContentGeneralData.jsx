import { useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentGeneralData.module.css";
import backButton from "../../../assets/img/backBtn.svg";

const ContentGeneralData = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const cGeneralDataTitle = data.cGeneralData[0].text;
    const cGeneralDataText = data.cGeneralData[1].text;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} alt="back" />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{cGeneralDataTitle}</h1>
            <p className={`standard-text ${styles.intro2Text1}`}>{cGeneralDataText}</p>

            <div className={styles.cardsContainer}>
            </div>

            <div className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`} onClick={onNext} >
                <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentGeneralData;