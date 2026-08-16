import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { Activity } from "../../types/WellnessJournalTypes";
import styles from "./dashboard.module.css";
import { getActivities } from "../../api/activities";
import { getJournalEntry } from "../../api/journal";

type JournalStatus = "loading" | "completed" | "missing" | "error";

function getLocalDate(): string {
  const today = new Date();
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function Today() {
  const { isLoggedIn } = useAuth();
  const [status, setStatus] = useState<JournalStatus>("loading");
  const [suggestion, setSuggestion] = useState<Activity | null>(null);

  useEffect(() => {
    async function checkTodayJournal() {
      if (!isLoggedIn) {
        return;
      }

      setStatus("loading");
      try {
        await getJournalEntry(getLocalDate());
        setStatus("completed");
      } catch {
        setStatus("missing");
      }
    }

    void checkTodayJournal();
  }, [isLoggedIn]);

  useEffect(() => {
    async function loadSuggestion() {
      if (!isLoggedIn) {
        return;
      }

      try {
        const activities = await getActivities();
        if (activities.length > 0) {
          const suggestionIndex = new Date().getDate() % activities.length;
          setSuggestion(activities[suggestionIndex]);
        }
      } catch {
        setStatus("error");
      }
    }

    void loadSuggestion();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <section className={styles.dashboardSection}>
        <h2>Aujourd'hui</h2>
        <article className={styles.card}>
          <h3>Journal d'aujourd'hui</h3>
          <p>Connecte-toi pour consulter et remplir ton journal.</p>
        </article>
      </section>
    );
  }

  return (
    <section className={styles.dashboardSection}>
      <h2>Aujourd'hui</h2>

      <div className={styles.dashboardGrid}>
        <article className={styles.card}>
          <h3>Journal d'aujourd'hui</h3>

          {status === "loading" && <p>Vérification du journal...</p>}

          {status === "completed" && (
            <>
              <p className={styles.positiveStatus}>Ton journal du jour est complété.</p>
              <p>Tu peux le relire ou l'ajuster avant minuit.</p>
              <Link className={styles.actionLink} to="/wellness-journal">
                Voir mon journal
              </Link>
            </>
          )}

          {status === "missing" && (
            <>
              <p className={styles.missingStatus}>Ton journal n'est pas encore rempli.</p>
              <p>Prends quelques minutes pour te recentrer.</p>
              <Link className={styles.actionLink} to="/wellness-journal">
                Remplir mon journal
              </Link>
            </>
          )}

          {status === "error" && (
            <p className={styles.errorMessage}>Impossible de vérifier le journal pour l'instant.</p>
          )}
        </article>

        <article className={styles.card}>
          <h3>Suggestion du jour</h3>

          {suggestion ? (
            <>
              <p className={styles.suggestionName}>♡ {suggestion.name}</p>
              <p>{suggestion.desc ?? "Petite activité douce pour t'aider aujourd'hui."}</p>
              <Link className={styles.actionLink} to="/wellness-journal">
                Ajouter à mon journal
              </Link>
            </>
          ) : (
            <p>Chargement de la suggestion...</p>
          )}
        </article>
      </div>
    </section>
  );
}
