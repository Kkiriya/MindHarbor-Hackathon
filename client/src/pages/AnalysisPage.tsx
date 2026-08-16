import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AnalysisPeriodSelector from "../components/analysis/AnalysisPeriodSelector";
import IndicatorEvolution from "../components/analysis/IndicatorEvolution";
import WeekdayAverages from "../components/analysis/WeekdayAverages";
import PersonalizedInsights from "../components/analysis/PersonalizedInsights";
import type { AnalysisRange, AnalysisStats } from "../types/AnalysisTypes";
import styles from "./AnalysisPage.module.css";
import { getJournalInsights, getJournalStats } from "../api/journal";

export default function AnalysisPage() {
  const { isLoggedIn } = useAuth();
  const [range, setRange] = useState<AnalysisRange>("7d");
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadAnalysis() {
      if (!isLoggedIn) {
        return;
      }

      setError("");
      setIsLoading(true);

      try {
        const [statsData, insightsData] = await Promise.all([
          getJournalStats(range),
          getJournalInsights(range),
        ]);

        setStats(statsData);
        setInsights(insightsData);
        setLastUpdated(new Date());
      } catch {
        setError("Impossible de charger les analyses.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadAnalysis();
  }, [isLoggedIn, range]);

  return (
    <main className={styles.analysisPage}>
      <header className={styles.introduction}>
        <div>
          <h1>Mes analyses et tendances</h1>
          <p>Comprendre l'évolution de ton bien-être au fil du temps.</p>
          <small>Données calculées par le serveur</small>
        </div>

        {lastUpdated && (
          <p>
            Dernière mise à jour :{" "}
            {lastUpdated.toLocaleTimeString("fr-CA", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </header>

      {!isLoggedIn && (
        <p className={styles.panel}>Connecte-toi pour consulter tes analyses personnelles.</p>
      )}

      {isLoggedIn && (
        <>
          <AnalysisPeriodSelector range={range} onChange={setRange} />

          {error && <p className={styles.errorMessage}>{error}</p>}
          {isLoading && !error && <p>Chargement des analyses...</p>}

          {stats && (
            <>
              <IndicatorEvolution trends={stats.trends} />
              <WeekdayAverages trends={stats.trends} />
            </>
          )}

          <PersonalizedInsights insights={insights} />
        </>
      )}
    </main>
  );
}
