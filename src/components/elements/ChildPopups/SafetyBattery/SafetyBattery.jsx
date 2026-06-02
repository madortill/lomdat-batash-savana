import styles from "./SafetyBattery.module.css";
import { useData } from "../../../../context/DataContext";
import CommentGal from "../../CommentGal/CommentGal";
import batteryImage from "../../../../assets/img/safetyBatteryImg.svg";
import arrowSvg from "../../../../assets/img/curvedArrow1.svg";

const SafetyBattery = ({ onClose }) => {
    const { data } = useData();

    if (!data?.cSafetyBattery) return null;

    const title = data.cSafetyBattery[0].text;
    const bodyText = data.cSafetyBattery[1].text;
    const imageLabel = data.cSafetyBattery[2].text;
    const commentText = data.cSafetyBattery[3].text;
    const confirmText = data.cSafetyBattery[4].text;

    return (
        <div className={styles.popup} dir="rtl">
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.bodyText}>{bodyText}</p>

            <div className={styles.imageWrapper}>
                <img
                    src={batteryImage}
                    alt="מצבר הרכב"
                    className={styles.image}
                />
                
                <img 
                    src={arrowSvg} 
                    alt="חץ סימון" 
                    className={styles.arrowIcon} 
                />

                <span className={styles.imageLabel}>{imageLabel}</span>
            </div>

            <div className={styles.commentWrapper}>
                <CommentGal
                    text={commentText}
                    mood="red"
                    characterSide="right"
                    size="small"
                />
            </div>

            <div className={styles.confirmBtn} onClick={onClose}>
                {confirmText}
            </div>
        </div>
    );
};

export default SafetyBattery;