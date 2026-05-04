import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentKnowingTheVehicle.module.css";
import backButton from "../../../assets/img/backBtn.svg";

const ContentKnowingTheVehicle = ({ onNext, onBack }) => {
    const { data } = useData();

    if (!data || !data.general || !data.cKnowingVehicle) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const cKnowingVehicleTitle = data.cKnowingVehicle[0].text;
    const tableData = data.CIntro3[1].tableData;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{cKnowingVehicleTitle}</h1>
            <div className={`next-btn ${styles.nextBtn}`} onClick={onNext} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentKnowingTheVehicle;
