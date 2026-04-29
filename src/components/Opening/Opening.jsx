import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./Opening.module.css";
import backButton from "../../assets/img/backBtn.svg";
import road from "../../assets/img/road.svg";
import yellowSavanna from "../../assets/img/yellowSavanna.svg";



const Opening = () => {
    const { data } = useData();
    const navigate = useNavigate();

    if (!data || !data.general || !data.Opening) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.Opening[2].text;
    const openingTitle = data.Opening[0].text;
    const openingText = data.Opening[1].text;

    return (
        <div className="instructions-page">
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={() => navigate("/")} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className={styles.openingHeaderText}>{openingTitle}</h1>
            <p className={styles.openingText}>{openingText}</p>
            <img src={road} alt="road" className={styles.openingRoad}/>
            <img src={yellowSavanna} alt="yellow Savanna" className={styles.yellowSavanna}/>
            <div className={`next-btn ${styles.nextBtn}`} onClick={() => navigate("/NavPage")} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Opening;