import styles from "./MobileBlocker.module.css";

const MobileBlocker = () => {
    return (
        <div className={styles.mobileBlocker}>
            <div className={styles.mobileBox}>
                <h2>כיף לראות אתכם!</h2>
                <h3>שימו 💙   שהלומדה אינה מותאמת לטלפון</h3>

                <p>כדי ללמוד יש להיכנס דרך המחשב 💻</p>
            </div>
        </div>
    );
}

export default MobileBlocker;