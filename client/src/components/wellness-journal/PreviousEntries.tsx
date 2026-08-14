import styles from "./WellnessJournal.module.css";

export interface WellnessEntry {
    id: number;
    date: string;
    energy: number;
    mood: number;
    sleep: number;
    stress: number;
}

interface PreviousEntriesProps {
    entries?: WellnessEntry[];
}

const sampleEntries: WellnessEntry[] = [
    {
        id: 1,
        date: "2026-08-12",
        energy: 2,
        mood: 3,
        sleep: 4,
        stress: 4,
    },
    {
        id: 2,
        date: "2026-08-11",
        energy: 3,
        mood: 4,
        sleep: 3,
        stress: 2,
    },
    {
        id: 3,
        date: "2026-08-10",
        energy: 2,
        mood: 2,
        sleep: 3,
        stress: 5,
    },
];

const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
});

export default function PreviousEntries({entries = sampleEntries}: PreviousEntriesProps) {
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
                            <tr key={entry.id}>
                                <td>
                                    <time dateTime={entry.date}>
                                        {dateFormatter.format(new Date(entry.date))}
                                    </time>
                                </td>
                                <td>{entry.mood} / 5</td>
                                <td>{entry.energy} / 5</td>
                                <td>{entry.sleep} / 5</td>
                                <td>{entry.stress} / 5</td>
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
