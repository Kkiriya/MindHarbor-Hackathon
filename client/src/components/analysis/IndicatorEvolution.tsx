import {useState} from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type {Indicator, TrendEntry} from "../../types/AnalysisTypes.ts";
import styles from "../../pages/AnalysisPage.module.css";

interface Props {
    trends: TrendEntry[];
}

const indicators: Array<{key: Indicator; label: string; color: string}> = [
    {key: "generalMood", label: "Humeur", color: "#287271"},
    {key: "energyLevel", label: "Énergie", color: "#e9c46a"},
    {key: "sleepQuality", label: "Sommeil", color: "#457b9d"},
    {key: "stressLevel", label: "Stress", color: "#e76f51"},
];

const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
});

export default function IndicatorEvolution({trends}: Props) {
    const [indicator, setIndicator] = useState<Indicator>("generalMood");
    const selectedIndicator = indicators.find((item) => item.key === indicator)!;

    return (
        <section className={styles.panel}>
            <h2>Évolution des indicateurs</h2>

            <div className={styles.indicatorButtons}>
                {indicators.map((item) => (
                    <button
                        className={indicator === item.key ? styles.activeButton : ""}
                        key={item.key}
                        type="button"
                        onClick={() => setIndicator(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {trends.length === 0 ? (
                <p>Pas encore de données pour cette période.</p>
            ) : (
                <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trends}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis
                                dataKey="date"
                                tickFormatter={(date) => dateFormatter.format(new Date(date))}
                            />
                            <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]}/>
                            <Tooltip
                                labelFormatter={(date) =>
                                    dateFormatter.format(new Date(String(date)))
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey={indicator}
                                name={selectedIndicator.label}
                                stroke={selectedIndicator.color}
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </section>
    );
}
