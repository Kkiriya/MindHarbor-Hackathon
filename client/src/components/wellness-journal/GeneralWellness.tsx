import styles from "./WellnessJournal.module.css"

export default function GeneralWellness() {
    return (
        <section>
            <h3>Humeur Générale</h3>

            <div className={styles.grid}>
                <fieldset className={styles.group}>
                    <legend>Humeur générale</legend>
                    <label className={styles.option}>
                        <input type="radio" name="mood"/>
                        1 - Très mal
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="mood"/>
                        2 - Mal
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="mood"/>
                        3 - Moyen
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="mood"/>
                        4 - Bien
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="mood"/>
                        5 - Très bien
                    </label>
                </fieldset>

                <fieldset className={styles.group}>
                    <legend>Énergie</legend>
                    <label className={styles.option}>
                        <input type="radio" name="energy"/>
                        1 - Très fatigué
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="energy"/>
                        2 - Fatigué
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="energy"/>
                        3 - Moyen
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="energy"/>
                        4 - Énergique
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="energy"/>
                        5 - Plein d'énergie
                    </label>
                </fieldset>

                <fieldset className={styles.group}>
                    <legend>Sommeil</legend>
                    <label className={styles.option}>
                        <input type="radio" name="sleep"/>
                        1 - Très mal dormi
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="sleep"/>
                        2 - Mal dormi
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="sleep"/>
                        3 - Moyen
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="sleep"/>
                        4 - Bien dormi
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="sleep"/>
                        5 - Très bien dormi
                    </label>
                </fieldset>

                <fieldset className={styles.group}>
                    <legend>Stress</legend>
                    <label className={styles.option}>
                        <input type="radio" name="stress"/>
                        1 - Très peu stressé
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="stress"/>
                        2 - Peu stressé
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="stress"/>
                        3 - Stressé
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="stress"/>
                        4 - Très stressé
                    </label>
                    <label className={styles.option}>
                        <input type="radio" name="stress"/>
                        5 - Anxieux
                    </label>
                </fieldset>
            </div>
        </section>
    )
}
