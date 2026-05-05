import { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentGeneralData.module.css";
import backButton from "../../../assets/img/backBtn.svg";

import Dimensions from "./Dimensions/Dimensions";
// import Speed from "./Speed/Speed";
// import Inflation from "./Inflation/Inflation";
// import Fluids from "./Fluids/Fluids";
// import Fuel from "./Fuel/Fuel";

const cardComponents = {
    vehicleDimensions: Dimensions,
    // speed: Speed,
    // inflation: Inflation,
    // fluids: Fluids,
    // fuel: Fuel,
};

import speedIcon from "../../../assets/img/generalDataCards/speed.svg";
// import dimensionsIcon from "...";

const imageMap = {
    speedometer: speedIcon,
    // dimensions: dimensionsIcon,
};

const STORAGE_KEY = "visitedCards_generalData";

const ContentGeneralData = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();

    const backBtn  = data.general[0].text;
    const nextBtn  = data.general[1].text;
    const title    = data.cGeneralData[0].text;
    const bodyText = data.cGeneralData[1].text;
    const cards    = data.cGeneralDataCards;

    const [activeCard, setActiveCard] = useState(null);

    // localStorage — persists across full navigation away and back
    const [visitedCards, setVisitedCards] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    // Re-check on mount in case user already completed this in a previous visit
    useEffect(() => {
        if (cards && visitedCards.size === cards.length) {
            onComplete();
        }
    }, [visitedCards]);

    // result = { completed: true }  → user finished the card → mark visited
    // result = { completed: false } → user left early → card stays unvisited
    const handleCardBack = (cardKey, result) => {
        if (result.completed) {
            setVisitedCards(prev => {
                const updated = new Set(prev).add(cardKey);
                localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]));
                return updated;
            });
        }
        setActiveCard(null);
    };

    // Render the active sub-page (replaces hub entirely — no popup)
    if (activeCard) {
        const SubPageComponent = cardComponents[activeCard];
        return (
            <SubPageComponent
                onBack={(result) => handleCardBack(activeCard, result)}
                cardKey={activeCard}
            />
        );
    }

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} alt="back" />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{title}</h1>
            <p className={`standard-text ${styles.intro2Text1}`}>{bodyText}</p>

            <div className={styles.cardsContainer}>
                {cards && cards.map((card) => {
                    const isVisited = visitedCards.has(card.key);
                    return (
                        <div
                            key={card.key}
                            className={`${styles.card} ${isVisited ? styles.cardVisited : ""}`}
                            onClick={() => setActiveCard(card.key)}
                        >
                            {isVisited && <span className={styles.cardCheckmark}>✓</span>}
                            <img
                                src={imageMap[card.image]}
                                alt={card.label}
                                className={styles.cardImage}
                            />
                            <p className={styles.cardLabel}>{card.label}</p>
                        </div>
                    );
                })}
            </div>

            <div
                className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`}
                onClick={onNext}
            >
                <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentGeneralData;