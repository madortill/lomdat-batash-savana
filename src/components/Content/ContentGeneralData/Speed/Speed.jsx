import { useEffect } from "react";
import { useData } from "../../../../context/DataContext";
import styles from "./Speed.module.css";
import backButton from "../../../../assets/img/backBtn.svg";
import urbanImg from "../../../../assets/img/speed/urban.svg";
import interurbanImg from "../../../../assets/img/speed/interurban.svg";
import CommentGal from "../../../elements/CommentGal/CommentGal";

const CARD_KEY = "speed";

const Speed = ({ onBack, cardKey }) => {
    const { data } = useData();

    useEffect(() => {
        localStorage.setItem(`completed_${cardKey}`, "true");
    }, []);

    if (!data || !data.general || !data.cSpeed) return null;

    const backBtn = data.general[0].text;
    const nextBtn = data.general[1].text;
    const title = data.cSpeed[0].text;
    const urban = data.cSpeed[1];
    const interurban = data.cSpeed[2];
    const commentText = data.cSpeed[3].text;

    return (
        <div className={styles.subPage}>
            <div className="backBtnDiv">
                <img
                    src={backButton}
                    className="back-btn"
                    onClick={() => onBack({ completed: true })}
                    alt="back"
                />
                <p className="back-btn-text">{backBtn}</p>
            </div>

            <h1 className="main-header-text">{title}</h1>

            <div className={styles.contentFrame}>

                {/* Two image cards side by side */}
                <div className={styles.imagesRow}>

                    {/* Urban */}
                    <div className={styles.imageCard}>
                        <p className={styles.imageLabel}>{urban.label}</p>
                        <div className={styles.imageWrapper}>
                            <img src={urbanImg} alt="urban" className={styles.roadImg} />
                            <div className={styles.textOverlay}>
                                <p className={styles.overlayText}>{urban.speedText}</p>
                            </div>
                        </div>
                    </div>

                    {/* Interurban */}
                    <div className={styles.imageCard}>
                        <p className={styles.imageLabel}>{interurban.label}</p>
                        <div className={styles.imageWrapper}>
                            <img src={interurbanImg} alt="interurban" className={styles.roadImg} />
                            <div className={styles.textOverlay}>
                                <p className={styles.overlayText}>{interurban.speedText}</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* CommentGal at the bottom */}
                <div className={styles.commentWrapper}>
                    <CommentGal
                        text={commentText}
                        mood="yellow"
                        characterSide="right"
                        size="small"
                    />
                </div>

            </div>

            <div
                className="next-btn"
                onClick={() => onBack({ completed: true })}
            >
                <p className="next-btn-text">{nextBtn}</p>
            </div>
        </div>
    );
};

export default Speed;