import styles from "./WellnessJournal.module.css";

export default function DailyActivities() {
    return (
        <section className={styles.dailyActivities}>
            <h3>Activités du jour</h3>
            <fieldset className={styles.group}>
                <legend>Activités du jour</legend>
                <div className={styles.activitiesGrid}>
                    <label className={styles.option}>
                        <input type="checkbox" name="activity"/>
                        Exercice
                    </label>
                    <label className={styles.option}>
                        <input type="checkbox" name="activity"/>
                        Méditation
                    </label>
                    <label className={styles.option}>
                        <input type="checkbox" name="activity"/>
                        Lecture
                    </label>
                    <label className={styles.option}>
                        <input type="checkbox" name="activity"/>
                        Activités sociales
                    </label>
                    <label className={styles.option}>
                        <input type="checkbox" name="activity"/>
                        Loisirs
                    </label>
                    <label className={styles.option}>
                        <input type="checkbox" name="activity"/>
                        Repos
                    </label>
                </div>
            </fieldset>
        </section>
    )
}
