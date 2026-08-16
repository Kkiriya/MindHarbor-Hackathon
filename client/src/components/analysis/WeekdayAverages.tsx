import {useMemo} from "react";
import type {Indicator, TrendEntry} from "../../types/AnalysisTypes.ts";
import styles from "../../pages/AnalysisPage.module.css";

interface Props {
    trends: TrendEntry[];
}

const weekdays = [
    {index: 1, label: "Lundi"},
    {index: 2, label: "Mardi"},
    {index: 3, label: "Mercredi"},
    {index: 4, label: "Jeudi"},
    {index: 5, label: "Vendredi"},
    {index: 6, label: "Samedi"},
    {index: 0, label: "Dimanche"},
];

function average(entries: TrendEntry[], field: Indicator): string {
    if (entries.length === 0) {
        return "—";
    }

    const total = entries.reduce((sum, entry) => sum + entry[field], 0);
    return `${(total / entries.length).toFixed(1)} / 5`;
}

export default function WeekdayAverages({trends}: Props) {
    const weekdayAverages = useMemo(() => {
        return weekdays.map((weekday) => ({
            label: weekday.label,
            entries: trends.filter(
                (entry) => new Date(entry.date).getUTCDay() === weekday.index,
            ),
        }));
    }, [trends]);

    return (
        <section className={styles.panel}>
            <h2>Moyennes par jour de la semaine</h2>

            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Jour</th>
                            <th>Humeur</th>
                            <th>Énergie</th>
                            <th>Sommeil</th>
                            <th>Stress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weekdayAverages.map((weekday) => (
                            <tr key={weekday.label}>
                                <th scope="row">{weekday.label}</th>
                                <td>{average(weekday.entries, "generalMood")}</td>
                                <td>{average(weekday.entries, "energyLevel")}</td>
                                <td>{average(weekday.entries, "sleepQuality")}</td>
                                <td>{average(weekday.entries, "stressLevel")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
