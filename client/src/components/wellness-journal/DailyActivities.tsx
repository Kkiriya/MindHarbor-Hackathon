import styles from "./WellnessJournal.module.css";
import type {Activity} from "../../types/WellnessJournalTypes.ts";

interface Props {
    activities: Activity[];
    selectedActivitiesId: string[];
    onChange: (activityId: string, checked: boolean) => void;
}

export default function DailyActivities({
    activities,
    selectedActivitiesId,
    onChange,
}: Props) {
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
