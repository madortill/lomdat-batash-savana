import { useEffect } from "react";
import { useData } from "../../../../context/DataContext";
import styles from "./Air.module.css";
import backButton from "../../../../assets/img/backBtn.svg";

const Air = ({ onBack, cardKey }) => {
    const { data } = useData();

    useEffect(() => {
        localStorage.setItem(`completed_${cardKey}`, "true");
    }, []);

    if (!data || !data.general) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;

    return (
        <div>
            <div className="backBtnDiv">
                <img
                    src={backButton}
                    className="back-btn"
                    onClick={() => onBack({ completed: true })}
                    alt="back"
                />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{cardKey}</h1>
            <div
                className="next-btn"
                onClick={() => onBack({ completed: true })}
            >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Air;