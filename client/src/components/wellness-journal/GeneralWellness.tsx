import styles from "./WellnessJournal.module.css"
import type {JournalEntry} from "../../types/WellnessJournalTypes.ts";

/**
 * Props for the GeneralWellness component that the function must receive.
 * @property data The current wellness data.
 * @property onChange A callback function to handle changes to the wellness data.
 */
interface Props {
    data: JournalEntry;
    // keyof confirms that the field is one of the keys of the WellnessData type, and value is a number.
    onChange: (field: keyof JournalEntry, value: number) => void;
}

//TODO Check if there is a way to have a kind of array of inputs so it don't repeat as much

export default function GeneralWellness({data, onChange}: Props) {
    return (
        <section>
            <h3>Humeur Générale</h3>

            <div className={styles.grid}>
                <fieldset className={styles.group}>
                    <legend>Humeur générale</legend>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="mood"
                            value="1"
                            checked={data.mood === 1}
                            onChange={() => onChange("mood", 1)}
                        />
                        1 - Très mal
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="mood"
                            value="2"
                            checked={data.mood === 2}
                            onChange={() => onChange("mood", 2)}
                        />
                        2 - Mal
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="mood"
                            value="3"
                            checked={data.mood === 3}
                            onChange={() => onChange("mood", 3)}
                        />
                        3 - Moyen
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="mood"
                            value="4"
                            checked={data.mood === 4}
                            onChange={() => onChange("mood", 4)}
                        />
                        4 - Bien
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="mood"
                            value="5"
                            checked={data.mood === 5}
                            onChange={() => onChange("mood", 5)}
                        />
                        5 - Très bien
                    </label>
                </fieldset>

                <fieldset className={styles.group}>
                    <legend>Énergie</legend>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="energy"
                            value="1"
                            checked={data.energy === 1}
                            onChange={() => onChange("energy", 1)}
                        />
                        1 - Très fatigué
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="energy"
                            value="2"
                            checked={data.energy === 2}
                            onChange={() => onChange("energy", 2)}
                        />
                        2 - Fatigué
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="energy"
                            value="3"
                            checked={data.energy === 3}
                            onChange={() => onChange("energy", 3)}
                        />
                        3 - Moyen
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="energy"
                            value="4"
                            checked={data.energy === 4}
                            onChange={() => onChange("energy", 4)}
                        />
                        4 - Énergique
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="energy"
                            value="5"
                            checked={data.energy === 5}
                            onChange={() => onChange("energy", 5)}
                        />
                        5 - Plein d'énergie
                    </label>
                </fieldset>

                <fieldset className={styles.group}>
                    <legend>Sommeil</legend>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="sleep"
                            value="1"
                            checked={data.sleep === 1}
                            onChange={() => onChange("sleep", 1)}
                        />
                        1 - Très mal dormi
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="sleep"
                            value="2"
                            checked={data.sleep === 2}
                            onChange={() => onChange("sleep", 2)}
                        />
                        2 - Mal dormi
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="sleep"
                            value="3"
                            checked={data.sleep === 3}
                            onChange={() => onChange("sleep", 3)}
                        />
                        3 - Moyen
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="sleep"
                            value="4"
                            checked={data.sleep === 4}
                            onChange={() => onChange("sleep", 4)}
                        />
                        4 - Bien dormi
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="sleep"
                            value="5"
                            checked={data.sleep === 5}
                            onChange={() => onChange("sleep", 5)}
                        />
                        5 - Très bien dormi
                    </label>
                </fieldset>

                <fieldset className={styles.group}>
                    <legend>Stress</legend>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="stress"
                            value="1"
                            checked={data.stress === 1}
                            onChange={() => onChange("stress", 1)}
                        />
                        1 - Très peu stressé
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="stress"
                            value="2"
                            checked={data.stress === 2}
                            onChange={() => onChange("stress", 2)}
                        />
                        2 - Peu stressé
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="stress"
                            value="3"
                            checked={data.stress === 3}
                            onChange={() => onChange("stress", 3)}
                        />
                        3 - Stressé
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="stress"
                            value="4"
                            checked={data.stress === 4}
                            onChange={() => onChange("stress", 4)}
                        />
                        4 - Très stressé
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="stress"
                            value="5"
                            checked={data.stress === 5}
                            onChange={() => onChange("stress", 5)}
                        />
                        5 - Anxieux
                    </label>
                </fieldset>
            </div>
        </section>
    )
}
