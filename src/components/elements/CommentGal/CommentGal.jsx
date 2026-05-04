import styles from "./CommentGal.module.css";
import happyChar from "../../../assets/img/gal/HappyGal.svg";
import neutralChar from "../../../assets/img/gal/NeutralGal.svg";
import worriedChar from "../../../assets/img/gal/WorriedGal.svg";

const moodMap = {
    green: { char: happyChar, box: styles.green, text: styles.textGreen },
    orange: { char: neutralChar, box: styles.orange, text: styles.textOrange },
    red: { char: worriedChar, box: styles.red, text: styles.textRed },
};

const CommentGal = ({ text, mood, characterSide = "right", size = "medium" }) => {
    const { char, box, text: textColor } = moodMap[mood] ?? moodMap["green"];

    const sizeStyles = {
        small: { fontSize: "clamp(0.85rem, 1.5vw, 1rem)", padding: "0.75rem 1.25rem", charWidth: "clamp(60px, 8vw, 90px)" },
        medium: { fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", padding: "1rem 1.5rem", charWidth: "clamp(80px, 10vw, 120px)" },
        large: { fontSize: "clamp(1rem, 2vw, 1.25rem)", padding: "1.25rem 2rem", charWidth: "clamp(100px, 13vw, 160px)" },
    };

    const { fontSize, padding, charWidth } = sizeStyles[size] ?? sizeStyles["medium"];

    return (
        <div className={`${styles.wrapper} ${characterSide === "left" ? styles.reverse : ""}`}>
            <div className={`${styles.textBox} ${box}`} style={{ padding }}>
                <p className={`${styles.text} ${textColor}`} style={{ fontSize }} dangerouslySetInnerHTML={{ __html: text }}/>
            </div>
            <img src={char} alt={mood} className={styles.character} style={{ width: charWidth }} />
        </div>
    );
};

export default CommentGal;