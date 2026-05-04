import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import styles from "./ContentIntroPage2.module.css";
import backButton from "../../../assets/img/backBtn.svg";

const ContentIntro = () => {
    const { data } = useData();
    const navigate = useNavigate();

    if (!data || !data.general || !data.Opening) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const intro2Title = data.CIntro2[0].text;

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={() => navigate("/")} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{intro2Title}</h1>
            <div className={`next-btn ${styles.nextBtn}`} onClick={() => navigate("/")} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentIntro;