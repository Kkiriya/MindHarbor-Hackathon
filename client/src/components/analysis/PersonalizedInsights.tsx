import styles from "../../pages/AnalysisPage.module.css";

interface Props {
    insights: string[];
}

export default function PersonalizedInsights({insights}: Props) {
    return (
        <section className={styles.panel}>
            <h2>Observations personnalisées</h2>

            {insights.length > 0 ? (
                <ul className={styles.insightsList}>
                    {insights.map((insight) => (
                        <li key={insight}>{insight}</li>
                    ))}
                </ul>
            ) : (
                <p>Pas encore assez de données pour générer des observations.</p>
            )}
        </section>
    );
}
