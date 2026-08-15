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
                            checked={data.generalMood === 1}
                            onChange={() => onChange("generalMood", 1)}
                        />
                        1 - Très mal
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="mood"
                            value="2"
                            checked={data.generalMood === 2}
                            onChange={() => onChange("generalMood", 2)}
                        />
                        2 - Mal
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="mood"
                            value="3"
                            checked={data.generalMood === 3}
                            onChange={() => onChange("generalMood", 3)}
                        />
                        3 - Moyen
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="mood"
                            value="4"
                            checked={data.generalMood === 4}
                            onChange={() => onChange("generalMood", 4)}
                        />
                        4 - Bien
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="mood"
                            value="5"
                            checked={data.generalMood === 5}
                            onChange={() => onChange("generalMood", 5)}
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
                            checked={data.energyLevel === 1}
                            onChange={() => onChange("energyLevel", 1)}
                        />
                        1 - Très fatigué
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="energy"
                            value="2"
                            checked={data.energyLevel === 2}
                            onChange={() => onChange("energyLevel", 2)}
                        />
                        2 - Fatigué
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="energy"
                            value="3"
                            checked={data.energyLevel === 3}
                            onChange={() => onChange("energyLevel", 3)}
                        />
                        3 - Moyen
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="energy"
                            value="4"
                            checked={data.energyLevel === 4}
                            onChange={() => onChange("energyLevel", 4)}
                        />
                        4 - Énergique
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="energy"
                            value="5"
                            checked={data.energyLevel === 5}
                            onChange={() => onChange("energyLevel", 5)}
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
                            checked={data.sleepQuality === 1}
                            onChange={() => onChange("sleepQuality", 1)}
                        />
                        1 - Très mal dormi
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="sleep"
                            value="2"
                            checked={data.sleepQuality === 2}
                            onChange={() => onChange("sleepQuality", 2)}
                        />
                        2 - Mal dormi
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="sleep"
                            value="3"
                            checked={data.sleepQuality === 3}
                            onChange={() => onChange("sleepQuality", 3)}
                        />
                        3 - Moyen
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="sleep"
                            value="4"
                            checked={data.sleepQuality === 4}
                            onChange={() => onChange("sleepQuality", 4)}
                        />
                        4 - Bien dormi
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="sleep"
                            value="5"
                            checked={data.sleepQuality === 5}
                            onChange={() => onChange("sleepQuality", 5)}
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
                            checked={data.stressLevel === 1}
                            onChange={() => onChange("stressLevel", 1)}
                        />
                        1 - Très peu stressé
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="stress"
                            value="2"
                            checked={data.stressLevel === 2}
                            onChange={() => onChange("stressLevel", 2)}
                        />
                        2 - Peu stressé
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="stress"
                            value="3"
                            checked={data.stressLevel === 3}
                            onChange={() => onChange("stressLevel", 3)}
                        />
                        3 - Stressé
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="stress"
                            value="4"
                            checked={data.stressLevel === 4}
                            onChange={() => onChange("stressLevel", 4)}
                        />
                        4 - Très stressé
                    </label>
                    <label className={styles.option}>
                        <input
                            type="radio"
                            name="stress"
                            value="5"
                            checked={data.stressLevel === 5}
                            onChange={() => onChange("stressLevel", 5)}
                        />
                        5 - Anxieux
                    </label>
                </fieldset>
            </div>
        </section>
    )
}
