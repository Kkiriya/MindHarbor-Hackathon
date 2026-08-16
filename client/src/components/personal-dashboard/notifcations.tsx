import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.tsx";
import styles from "./dashboard.module.css";

interface InsightsData {
    insights: string[];
}

export default function Notifications() {
    const {token} = useAuth();
    const [insights, setInsights] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadInsights() {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get<{data: InsightsData}>(
                    "http://localhost:3000/api/v1/journal/insights",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                setInsights(response.data.data.insights);
            } catch (requestError) {
                console.error("Unable to load insights:", requestError);
                setError("Impossible de charger les observations.");
            } finally {
                setIsLoading(false);
            }
        }

        loadInsights();
    }, [token]);

    return (
        <section className={styles.card}>
            <h2>Observations récentes</h2>

            {!token && <p>Connecte-toi pour obtenir des observations personnalisées.</p>}
            {isLoading && <p>Analyse de tes entrées...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {token && !isLoading && !error && insights.length === 0 && (
                <p>Pas encore assez de données pour générer des observations.</p>
            )}

            {insights.length > 0 && (
                <ul className={styles.insightsList}>
                    {insights.map((insight) => (
                        <li key={insight}>{insight}</li>
                    ))}
                </ul>
            )}
        </section>
    );
}
