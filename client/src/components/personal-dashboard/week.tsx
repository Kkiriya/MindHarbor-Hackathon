import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.tsx";
import styles from "./dashboard.module.css";

interface TrendEntry {
    generalMood: number;
}

interface WeeklyStats {
    entries: number;
    averages: {
        mood: number | null;
        energy: number | null;
        sleepQuality: number | null;
        stress: number | null;
    };
    trends: TrendEntry[];
}

function formatAverage(value: number | null): string {
    return value === null ? "—" : `${value.toFixed(1)} / 5`;
}

function getMoodTrend(trends: TrendEntry[]): string {
    if (trends.length < 2) {
        return "Données insuffisantes";
    }

    const difference = trends[trends.length - 1].generalMood - trends[0].generalMood;

    if (difference > 0) {
        return "En amélioration";
    }

    if (difference < 0) {
        return "En diminution";
    }

    return "Stable";
}

export default function Week() {
    const {token} = useAuth();
    const [stats, setStats] = useState<WeeklyStats | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadWeeklyStats() {
            if (!token) {
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/journal/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            range: "7d",
                        },
                    },
                );

                setStats(response.data.data);
            } catch (requestError) {
                console.error("Unable to load weekly stats:", requestError);
                setError("Impossible de charger le résumé de la semaine.");
            }
        }

        loadWeeklyStats();
    }, [token]);

    return (
        <article className={styles.card}>
            <h3>Résumé</h3>

            {!token && <p>Connecte-toi pour voir ton résumé.</p>}
            {token && !stats && !error && <p>Chargement du résumé...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {stats && (
                <>
                    <dl className={styles.statsGrid}>
                        <div>
                            <dt>Humeur moyenne</dt>
                            <dd>{formatAverage(stats.averages.mood)}</dd>
                        </div>
                        <div>
                            <dt>Énergie moyenne</dt>
                            <dd>{formatAverage(stats.averages.energy)}</dd>
                        </div>
                        <div>
                            <dt>Sommeil moyen</dt>
                            <dd>{formatAverage(stats.averages.sleepQuality)}</dd>
                        </div>
                        <div>
                            <dt>Stress moyen</dt>
                            <dd>{formatAverage(stats.averages.stress)}</dd>
                        </div>
                        <div>
                            <dt>Tendance de l’humeur</dt>
                            <dd>{getMoodTrend(stats.trends)}</dd>
                        </div>
                        <div>
                            <dt>Entrées</dt>
                            <dd>{stats.entries} jour{stats.entries > 1 ? "s" : ""} sur 7</dd>
                        </div>
                    </dl>

                    <Link className={styles.actionLink} to="/analysis">
                        Voir mes statistiques
                    </Link>
                </>
            )}
        </article>
    );
}
