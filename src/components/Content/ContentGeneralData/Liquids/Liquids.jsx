import { useState } from "react";
import { useData } from "../../../../context/DataContext";
import styles from "./Liquids.module.css";
import backButton from "../../../../assets/img/backBtn.svg";
import carSilhouette from "../../../../assets/img/sideviewSavanna.svg";

const CARD_KEY = "liquids";

const Liquids = ({ onBack }) => {
    const { data } = useData();

    const wasCompleted = sessionStorage.getItem(`completed_${CARD_KEY}`) === "true";

    const [opened, setOpened] = useState([]);
    const [seen, setSeen] = useState(
        wasCompleted
            ? data?.cLiquids?.[2]?.items?.map((_, i) => i) ?? []
            : []
    );

    if (!data || !data.general || !data.cLiquids) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const title = data.cLiquids[0].text;
    const bodyText = data.cLiquids[1].text;
    const items = data.cLiquids[2].items;

    const allSeen = seen.length === items.length;

    const toggleDrive = (index) => {
        setOpened(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
        if (!seen.includes(index)) {
            const updatedSeen = [...seen, index];
            setSeen(updatedSeen);

            if (updatedSeen.length === items.length) {
                sessionStorage.setItem(`completed_${CARD_KEY}`, "true");
            }
        }
    };

    const handleBack = () => {
        onBack({ completed: allSeen });
    };

    const handleDone = () => {
        if (allSeen) onBack({ completed: true });
    };

    return (
        <div className={styles.subPage}>
            <div className="backBtnDiv">
                <img
                    src={backButton}
                    className="back-btn"
                    onClick={handleBack}
                    alt="back"
                />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{title}</h1>

            <div className={styles.contentFrame}>
                <p className={`standard-text ${styles.textGeneralDataSubPage}`}>{bodyText}</p>

                <div className={styles.roads}>
                    {items.map((item, index) => {
                        const active = opened.includes(index);
                        const isSeen = seen.includes(index);

                        return (
                            <div
                                key={item.id}
                                className={`${styles.road} ${active ? styles.active : ""}`}
                                onClick={() => toggleDrive(index)}
                            >
                                {/* Checkmark */}
                                {isSeen && (
                                    <div className={styles.check}>✔</div>
                                )}

                                {/* Car image */}
                                <img
                                    src={carSilhouette}
                                    alt="car"
                                    className={`${styles.car} ${active ? styles.driveLeft : styles.driveRight}`}
                                />

                                {/* Smoke animation on open */}
                                {active && <div className={styles.smoke} />}

                                {/* Text */}
                                <div className={styles.roadText}>
                                    <p className={`${styles.driveTitle} ${active ? styles.hideText : styles.showText}`}>
                                        {item.title}
                                    </p>

                                    <p className={`${styles.driveDescription} ${active ? styles.showDescription : styles.hideText}`}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div
                className={`${allSeen ? "next-btn" : "next-btn-disabled"}`}
                onClick={handleDone}
            >
                <p className={allSeen ? "next-btn-text" : "next-btn-text-disabled"}>
                    {nextBtn}
                </p>
            </div>
        </div>
    );
};

export default Liquids;