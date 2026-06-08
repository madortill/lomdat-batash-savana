import { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentGeneralData.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import Dimensions from "./Dimensions/Dimensions";
import Weight from "./Weight/Weight";
import Air from "./Air/Air";
import Liquids from "./Liquids/Liquids";
import Speed from "./Speed/Speed";

const cardComponents = {
    vehicleDimensions: Dimensions,
    weight: Weight,
    air: Air,
    liquids: Liquids,
    speed: Speed,
};

import speedIcon from "../../../assets/img/generalDataCards/speed.svg";
import weightIcon from "../../../assets/img/generalDataCards/weightGeneral.svg";
import liquidsIcon from "../../../assets/img/generalDataCards/waterDrops.svg";
import rulerIcon from "../../../assets/img/generalDataCards/ruler.svg";
import wheelIcon from "../../../assets/img/generalDataCards/wheel.svg";

const imageMap = {
    dimensions: rulerIcon,
    weight: weightIcon,
    air: wheelIcon,
    liquids: liquidsIcon,
    speed: speedIcon,
};

const STORAGE_KEY = "visitedCards_generalData";
const VISITED_KEY = "visitedCards_generalData";
const ACTIVE_KEY = "activeCard_generalData";

const ContentGeneralData = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const title = data.cGeneralData[0].text;
    const bodyText = data.cGeneralData[1].text;
    const cards = data.cGeneralDataCards;

    const [activeCard, setActiveCard] = useState(
        () => sessionStorage.getItem(ACTIVE_KEY) || null
    );

    const [visitedCards, setVisitedCards] = useState(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    useEffect(() => {
        if (cards && visitedCards.size === cards.length) {
            onComplete();
        }
    }, [visitedCards]);

    const openCard = (key) => {
        sessionStorage.setItem(ACTIVE_KEY, key);
        setActiveCard(key);
    };

    const handleCardBack = (cardKey, result) => {
        sessionStorage.removeItem(ACTIVE_KEY);
        setActiveCard(null);

        if (result.completed) {
            setVisitedCards(prev => {
                const updated = new Set(prev).add(cardKey);
                sessionStorage.setItem(VISITED_KEY, JSON.stringify([...updated]));
                return updated;
            });
        }
    };

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
                            onClick={() => openCard(card.key)}
                        >
                            {isVisited && (
                                <div className={styles.cardCheckmarkWrapper}>
                                    <span className={styles.cardCheckmarkIcon}>✓</span>
                                </div>
                            )}
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