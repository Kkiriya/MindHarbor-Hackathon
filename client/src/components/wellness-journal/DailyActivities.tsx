import styles from "./WellnessJournal.module.css";
import type {ActivitiesProps} from "../../types/WellnessJournalTypes.ts";

//TODO Find a way to have a description of the activities. There is a one in the db table.
// Maybe a mouse hover on the label to show the description ?
// Exercice: Même une courte marche comptent ?

export default function DailyActivities({
    activities,
    selectedActivitiesId,
    onChange,
}: ActivitiesProps) {
    return (
        <section className={styles.dailyActivities}>
            <fieldset className={styles.activitiesGrid}>
                <legend>Activités quotidiennes</legend>

            {activities.map((activity) => (
                <label className={styles.option} key={activity.activityId}>
                    <input
                        type="checkbox"
                        name="activity"
                        value={activity.activityId}
                        checked={selectedActivitiesId.includes(activity.activityId)}
                        onChange={(e) => onChange(activity.activityId, e.target.checked)}
                    />
                    <span title={activity.desc}>{activity.name}</span>
                </label>
            ))}
            </fieldset>
        </section>
    )
}
