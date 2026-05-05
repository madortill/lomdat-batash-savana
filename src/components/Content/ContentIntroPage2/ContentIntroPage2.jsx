import { useState } from "react";
import { useData } from "../../../context/DataContext";
import styles from "./ContentIntroPage2.module.css";
import backButton from "../../../assets/img/backBtn.svg";
import flipCar from "../../../assets/img/flipCar.svg";
import checkmark from "../../../assets/img/checkmark.svg";

const CARD_SIZES = [
    { width: "clamp(280px, 38vw, 520px)", height: "clamp(100px, 15vw, 190px)" }, // large
    { width: "clamp(230px, 30vw, 420px)", height: "clamp(85px,  13vw, 160px)" }, // medium
    { width: "clamp(180px, 23vw, 330px)", height: "clamp(70px,  11vw, 130px)" }, // small
];

const ContentIntroPage2 = ({ onComplete, onNext, onBack, canProceed }) => {
    const { data } = useData();

    const [flippedCards, setFlippedCards] = useState(() => {
        const saved = sessionStorage.getItem("seenCards_contentIntroPage2");
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const [flippedState, setFlippedState] = useState(new Set());
    if (!data || !data.general || !data.carFlipcards) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const intro2Title = data.CIntro2[0].text;
    const intro2Text1 = data.CIntro2[1].text;
    const cards = data.carFlipcards;

    const flipCard = (index) => {
        setFlippedState(prev => {
            const updated = new Set(prev);
            if (updated.has(index)) updated.delete(index);
            else updated.add(index);
            return updated;
        });

        setFlippedCards(prev => {
            const updated = new Set(prev).add(index);
            sessionStorage.setItem("seenCards_contentIntroPage2", JSON.stringify([...updated]));
            if (updated.size === cards.length) onComplete();
            return updated;
        });
    };

    return (
        <div className={styles.contentPage}>
            <div className="backBtnDiv">
                <img src={backButton} className="back-btn" onClick={onBack} alt="back" />
                <p className="back-btn-text">{backBtn}</p>
            </div>
            <h1 className="main-header-text">{intro2Title}</h1>
            <p className={`standard-text ${styles.intro2Text1}`}>{intro2Text1}</p>


            <div className={styles.cardsContainer}>
                {cards.map((card, i) => (
                    <div key={i} className={styles.cardColumn}>
                        <div
                            className={styles.cardWrapper}
                            style={{ width: CARD_SIZES[i].width }}
                            onClick={() => flipCard(i)}
                        >
                            {flippedCards.has(i) && (
                                <img src={checkmark} alt="completed" className={styles.checkmark} />
                            )}

                            <div className={`${styles.cardInner} ${flippedState.has(i) ? styles.flipped : ""}`}>
                                {/* Front — orange car */}
                                <div className={styles.cardFront}>
                                    <img
                                        src={flipCar}
                                        alt="car"
                                        className={`${styles.carImg} ${styles.carOrange}`}
                                    />
                                    <p className={styles.cardTextFront}>{card.front}</p>
                                </div>

                                {/* Back — blue car */}
                                <div className={styles.cardBack}>
                                    <img
                                        src={flipCar}
                                        alt="car"
                                        className={`${styles.carImg} ${styles.carBlue}`}
                                    />
                                    <p className={styles.cardTextBack}>{card.back}</p>
                                </div>
                            </div>
                        </div>
                        {card.label && (
                            <p className={styles.cardLabel}>{card.label}</p>
                        )}
                    </div>
                ))}
            </div>

            <div className={`${canProceed ? "next-btn" : "next-btn-disabled"} ${styles.nextBtn}`} onClick={onNext} >
                <p className={canProceed ? "next-btn-text" : "next-btn-text-disabled"}>{nextBtn}</p>
            </div>
        </div>
    );
};

export default ContentIntroPage2;