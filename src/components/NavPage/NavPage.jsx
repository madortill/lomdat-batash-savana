import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./NavPage.module.css";
import backButton from "../../assets/img/backBtn.svg";
import bigYellowSavanna from "../../assets/img/bigYellowSavanna.svg";
import arrow from "../../assets/img/curvedArrow1.svg";
import NavBar from "../elements/NavBar/NavBar";
import { pages } from "../Content/ContentPages";

const NavPage = () => {
    const { data } = useData();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            import("../Content/ContentControl");
        }, 300);

        return () => clearTimeout(timer);
    }, []);
    
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    
    if (!data || !data.general || !data.NavPage) return null;

    const [backBtn, navPageTitle, navPageTextClosed] = [data.general[0].text, data.NavPage[0].text, data.NavPage[1].text];
    const navPageTextOpen = data.NavPage[2]?.text ?? "לחצו על הנושא הראשון והתחילו ללמוד!";

    const handleNavbarNavigate = (targetPage) => {
        if (targetPage === 0) { sessionStorage.setItem("currentStep", "0"); navigate("/Content"); }
    };

    return (
        <div className="navpage-page">
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={() => navigate("/Opening")} alt="חזרה" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className={styles.navPageTitle}>{navPageTitle}</h1>

            <div className={`${styles.instructionWrapper} ${isNavbarOpen ? styles.instructionOpen : ""}`}>
                <p className={styles.navPageText}>{isNavbarOpen ? navPageTextOpen : navPageTextClosed}</p>
                <img src={arrow} alt="" aria-hidden="true" className={styles.arrow} />
            </div>

            <div className={styles.carContainer}>
                <img src={bigYellowSavanna} alt="big yellow Savanna" className={styles.bigYellowSavanna} />
                <div className={styles.yellowOverlay}></div>
            </div>

            <NavBar topics={pages} currentPage={0} accessiblePageCount={1} onNavigate={handleNavbarNavigate} labels={data?.navbar} variant="navPage" onOpenChange={setIsNavbarOpen} />
        </div>
    );
};

export default NavPage;