import styles from "./CommentGal.module.css";
import happyChar from "../../../assets/img/gal/HappyGal.svg";
import neutralChar from "../../../assets/img/gal/NeutralGal.svg";
import worriedChar from "../../../assets/img/gal/WorriedGal.svg";

const moodMap = {
    green: { char: happyChar, box: styles.green, text: styles.textGreen },
    orange: { char: neutralChar, box: styles.orange, text: styles.textOrange },
    red: { char: worriedChar, box: styles.red, text: styles.textRed },
};

const sizeMap = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
};

const CommentGal = ({ text, mood = "green", characterSide = "right", size = "medium" }) => {
    const { char, box, text: textColor } = moodMap[mood] ?? moodMap.green;
    const sideClass = characterSide === "left" ? styles.leftCharacter : styles.rightCharacter;
    const sizeClass = sizeMap[size] ?? styles.medium;

    return (
        <div className={`${styles.wrapper} ${sideClass} ${sizeClass}`} dir="rtl">
            <div className={`${styles.textBox} ${box}`}>
                <p className={`${styles.text} ${textColor}`} dangerouslySetInnerHTML={{ __html: text }} />
            </div>

            <img src={char} alt="" aria-hidden="true" className={styles.character} />
        </div>
    );
};

export default CommentGal;