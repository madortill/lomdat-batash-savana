import styles from "./DisabledButton.module.css";
import arrow from "../../../../assets/img/curvedArrow1.svg";

const DisabledButton = ({ text1, buttonText, text2, onClose }) => {
    return (
        <div className={styles.container} dir="rtl">
            <button type="button" className={styles.closeBtn} onClick={onClose}>×</button>

            <p className={styles.topText} dangerouslySetInnerHTML={{ __html: text1 }} />

            <div className={styles.middle}>
                <div className={styles.disabledBtn}>{buttonText}</div>
                <img src={arrow} alt="" className={styles.arrow} />
            </div>

            <p className={styles.bottomText} dangerouslySetInnerHTML={{ __html: text2 }} />
        </div>
    );
};

export default DisabledButton;