import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./NavPage.module.css";
import backButton from "../../assets/img/backBtn.svg";
import bigYellowSavanna from "../../assets/img/bigYellowSavanna.svg";
import NavBar from "../elements/NavBar/NavBar";



const NavPage = () => {
    const { data } = useData();
    const navigate = useNavigate();

    if (!data || !data.general || !data.NavPage) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const navPageTitle = data.NavPage[0].text;
    const navPageText = data.NavPage[1].text;

    return (
        <div className="navpage-page">
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={() => navigate("/")} />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className={styles.navPageTitle}>{navPageTitle}</h1>
            <p className={styles.navPageText}>{navPageText}</p>
            <div className={styles.carContainer}>
                <img src={bigYellowSavanna} alt="big yellow Savanna" className={styles.bigYellowSavanna} />
                <div className={styles.yellowOverlay}></div>
            </div>
            <div className={styles.navBar}>
                <NavBar />
            </div>
            <div className={`next-btn ${styles.nextBtn}`} onClick={() => navigate("/Content")} >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default NavPage;