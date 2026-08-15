import styles from "./WellnessJournal.module.css";

export default function Gratitude() {
    return (
        <section>
            <h3>Gratitude (facultatif)</h3>
            <textarea className={styles.textarea}/>
        </section>
    );
}
