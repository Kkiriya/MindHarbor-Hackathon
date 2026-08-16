import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./dashboard.module.css";
import { getJournalInsights } from "../../api/journal";

export default function Notifications() {
  const { isLoggedIn } = useAuth();
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInsights() {
      if (!isLoggedIn) {
        setIsLoading(false);
        return;
      }

      try {
        setInsights(await getJournalInsights("30d"));
      } catch {
        setError("Impossible de charger les observations.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadInsights();
  }, [isLoggedIn]);

  return (
    <section className={styles.card}>
      <h2>Observations récentes</h2>

      {!isLoggedIn && <p>Connecte-toi pour obtenir des observations personnalisées.</p>}
      {isLoading && <p>Analyse de tes entrées...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {isLoggedIn && !isLoading && !error && insights.length === 0 && (
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
