import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./End.module.css";
import backButton from "../../assets/img/backBtn.svg";
import road from "../../assets/img/road.svg";
import yellowSavanna from "../../assets/img/yellowSavanna.svg";

const CONFETTI_KEY = "End_confetti_seen";
const confettiPieces = Array.from({ length: 150 }, (_, index) => index);

const End = () => {
    const { data } = useData();
    const navigate = useNavigate();

    const [showConfetti, setShowConfetti] = useState(() => {
        return sessionStorage.getItem(CONFETTI_KEY) !== "true";
    });

    useEffect(() => {
        if (!showConfetti) return;

        sessionStorage.setItem(CONFETTI_KEY, "true");

        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showConfetti]);

    if (!data || !data.general || !data.End) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.End[1].text;
    const EndTitle = data.End[0].text;

    return (
        <div className="opening-page">
            {showConfetti && (
                <div className={styles.confettiLayer} aria-hidden="true">
                    {confettiPieces.map((piece) => (
                        <span
                            key={piece}
                            className={`${styles.confettiPiece} ${styles[`confettiPiece${piece % 8}`]}`}
                            style={{
                                "--x": `${(piece * 17) % 100}%`,
                                "--delay": `${(piece % 20) * 0.045}s`,
                                "--duration": `${2.4 + (piece % 7) * 0.1}s`,
                                "--drift": `${((piece % 9) - 4) * 1.4}rem`,
                                "--start-rotate": `${(piece * 31) % 360}deg`,
                                "--end-rotate": `${360 + ((piece * 47) % 540)}deg`,
                                "--size": `${0.35 + (piece % 5) * 0.08}rem`,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="backBtnDiv">
                <img
                    src={backButton}
                    className="back-btn"
                    onClick={() => {
                        window.location.href = "https://madortill.github.io/batash-package/";
                    }}
                    alt="חזרה"
                />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className={styles.openingHeaderText}>{EndTitle}</h1>

            <img src={road} alt="road" className={styles.openingRoad} />

            <img
                src={yellowSavanna}
                alt="yellow Savanna"
                className={styles.yellowSavanna}
            />

            <div
                className={`next-btn ${styles.nextBtn}`}
                onClick={() => navigate("/Opening")}
            >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default End;