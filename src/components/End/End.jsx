import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./End.module.css";
import backButton from "../../assets/img/backBtn.svg";
import road from "../../assets/img/road.svg";
import yellowSavanna from "../../assets/img/yellowSavanna.svg";



const Opening = () => {
    const { data } = useData();
    const navigate = useNavigate();

    if (!data || !data.general || !data.Opening) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.End[1].text;
    const EndTitle = data.End[0].text;

    return (
        <div className="opening-page">
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={() => navigate("/Content")} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className={styles.openingHeaderText}>{EndTitle}</h1>
            <img src={road} alt="road" className={styles.openingRoad}/>
            <img src={yellowSavanna} alt="yellow Savanna" className={styles.yellowSavanna}/>
            <div className={`next-btn ${styles.nextBtn}`} onClick={() => navigate("/Opening")} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Opening;