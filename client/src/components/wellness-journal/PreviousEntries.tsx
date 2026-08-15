import styles from "./WellnessJournal.module.css";
import type {JournalEntry} from "../../types/WellnessJournalTypes.ts";

interface Props {
    entries: JournalEntry[];
}

const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
});

export default function PreviousEntries({entries}: Props) {
    return (
        <section className={styles.group}>
            <h3>Entrées antérieures</h3>

            <div className={styles.tableContainer}>
                <table className={styles.entriesTable}>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Humeur</th>
                            <th scope="col">Énergie</th>
                            <th scope="col">Sommeil</th>
                            <th scope="col">Stress</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {entries.map((entry) => (
                            <tr key={entry.journalId}>
                                <td>
                                    <time dateTime={entry.date}>
                                        {dateFormatter.format(new Date(entry.date))}
                                    </time>
                                </td>
                                <td>{entry.generalMood} / 5</td>
                                <td>{entry.energyLevel} / 5</td>
                                <td>{entry.sleepQuality} / 5</td>
                                <td>{entry.stressLevel} / 5</td>
                                <td>
                                    <button className={styles.actionButton} type="button">
                                        Consulter
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav className={styles.pagination} aria-label="Pagination des entrées">
                <button type="button" disabled>
                    Précédent
                </button>
                <span>Page 1 de 3</span>
                <button type="button">
                    Suivant
                </button>
            </nav>
        </section>
    );
}
