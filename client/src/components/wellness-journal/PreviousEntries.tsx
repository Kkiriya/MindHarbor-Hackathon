import styles from "./WellnessJournal.module.css";
import type {JournalEntry} from "../../types/WellnessJournalTypes.ts";

interface Props {
    entries: JournalEntry[];
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
});

export default function PreviousEntries(
    {
        entries,
        currentPage,
        totalPages,
        onPrevious,
        onNext
    }: Props) {
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

            <nav className={styles.pagination}
                 aria-label="Pagination des entrées">
                <button
                    type="button"
                onClick={onPrevious}
                disabled={currentPage <= 1}>
                    Précédent
                </button>
                <span>Page {currentPage} de {totalPages}</span>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={currentPage >= totalPages}>
                    Suivant
                </button>
            </nav>
        </section>
    );
}
