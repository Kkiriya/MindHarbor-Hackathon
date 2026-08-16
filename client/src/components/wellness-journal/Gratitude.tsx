import styles from "./WellnessJournal.module.css";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function Gratitude({value, onChange}: Props) {
    return (
        <section>
            <h3>Gratitude (facultatif)</h3>
            <textarea
                className={styles.textarea}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </section>
    );
}
