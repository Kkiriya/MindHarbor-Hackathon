import styles from "./WellnessJournal.module.css";

export default function SignificantEvents() {
    return (
        <section>
            <h3>Événements marquants</h3>
            <textarea className={styles.textarea}/>
        </section>
    );
}
