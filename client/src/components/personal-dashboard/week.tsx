import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./dashboard.module.css";
import { getJournalStats } from "../../api/journal";
import type { AnalysisStats } from "../../types/AnalysisTypes";

function formatAverage(value: number | null): string {
  return value === null ? "—" : `${value.toFixed(1)} / 5`;
}

function getMoodTrend(stats: AnalysisStats): string {
  if (stats.trends.length < 2) {
    return "Données insuffisantes";
  }

  const difference = stats.trends[stats.trends.length - 1].generalMood - stats.trends[0].generalMood;
  if (difference > 0) {
    return "En amélioration";
  }
  if (difference < 0) {
    return "En diminution";
  }
  return "Stable";
}

export default function Week() {
  const { isLoggedIn } = useAuth();
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWeeklyStats() {
      if (!isLoggedIn) {
        return;
      }

      try {
        setStats(await getJournalStats("7d"));
      } catch {
        setError("Impossible de charger le résumé de la semaine.");
      }
    }

    void loadWeeklyStats();
  }, [isLoggedIn]);

  return (
    <article className={styles.card}>
      <h3>Résumé</h3>

      {!isLoggedIn && <p>Connecte-toi pour voir ton résumé.</p>}
      {isLoggedIn && !stats && !error && <p>Chargement du résumé...</p>}
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
              <dt>Tendance de l'humeur</dt>
              <dd>{getMoodTrend(stats)}</dd>
            </div>
            <div>
              <dt>Entrées</dt>
              <dd>
                {stats.entries} jour{stats.entries > 1 ? "s" : ""} sur 7
              </dd>
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
