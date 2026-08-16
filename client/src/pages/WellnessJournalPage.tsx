import { useEffect, useState } from "react";
import GeneralWellness from "../components/wellness-journal/GeneralWellness";
import PreviousEntries from "../components/wellness-journal/PreviousEntries";
import DailyActivities from "../components/wellness-journal/DailyActivities";
import SignificantEvents from "../components/wellness-journal/SignificantEvents";
import Gratitude from "../components/wellness-journal/Gratitude";
import styles from "./WellnessJournal.module.css";
import type { Activity, JournalEntry, JournalEntryData } from "../types/WellnessJournalTypes";
import { createJournalEntry, getJournalEntries } from "../api/journal";
import { getActivities } from "../api/activities";
import { useAuth } from "../hooks/useAuth";

function getLocalDate(): string {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function WellnessJournalPage() {
  const { isLoggedIn } = useAuth();
  const [journalData, setJournalData] = useState<JournalEntryData>({
    energyLevel: 0,
    generalMood: 0,
    sleepQuality: 0,
    stressLevel: 0,
    keyEvents: "",
    dailyGratitude: "",
  });
  const [selectedActivitiesId, setSelectedActivitiesId] = useState<string[]>([]);
  const [previousEntries, setPreviousEntries] = useState<JournalEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [entriesRefresh, setEntriesRefresh] = useState(0);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  useEffect(() => {
    async function loadPreviousEntries() {
      if (!isLoggedIn) {
        return;
      }

      setIsLoadingEntries(true);
      try {
        const response = await getJournalEntries({ page: currentPage, limit: 5 });
        setPreviousEntries(response.data);
        setTotalPages(response.meta.totalPages);
      } catch {
        setSaveError("Impossible de charger l'historique.");
      } finally {
        setIsLoadingEntries(false);
      }
    }

    void loadPreviousEntries();
  }, [currentPage, entriesRefresh, isLoggedIn]);

  useEffect(() => {
    async function loadActivities() {
      if (!isLoggedIn) {
        return;
      }

      setIsLoadingActivities(true);
      try {
        setActivities(await getActivities());
      } catch {
        setSaveError("Impossible de charger les activités.");
      } finally {
        setIsLoadingActivities(false);
      }
    }

    void loadActivities();
  }, [isLoggedIn]);

  function handlePreviousPage() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  function handleWellnessChange(field: keyof JournalEntryData, value: number) {
    setJournalData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleActivityChange(activityId: string, checked: boolean) {
    setSelectedActivitiesId((currentIds) =>
      checked ? [...currentIds, activityId] : currentIds.filter((id) => id !== activityId),
    );
  }

  async function handleSave() {
    if (!isLoggedIn) {
      setSaveError("Connecte-toi pour enregistrer ton journal.");
      return;
    }

    setSaveMessage("");
    setSaveError("");
    setIsSaving(true);

    try {
      await createJournalEntry(getLocalDate(), journalData, selectedActivitiesId);
      setSaveMessage("Entrée enregistrée avec succès.");
      setCurrentPage(1);
      setEntriesRefresh((currentValue) => currentValue + 1);
    } catch {
      setSaveError("Impossible d'enregistrer ton entrée aujourd'hui.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className={styles.wellnessJournal}>
      <header>
        <h1>Journal de bien-être</h1>
        <time>{new Date().toLocaleDateString()}</time>
      </header>

      {!isLoggedIn && (
        <p className={styles.errorMessage}>
          Connecte-toi pour remplir ton journal et voir ton historique.
        </p>
      )}

      {isLoggedIn && <GeneralWellness data={journalData} onChange={handleWellnessChange} />}

      {isLoggedIn && isLoadingActivities ? (
        <p>Chargement des activités...</p>
      ) : isLoggedIn ? (
        <DailyActivities
          activities={activities}
          selectedActivitiesId={selectedActivitiesId}
          onChange={handleActivityChange}
        />
      ) : null}

      {isLoggedIn ? (
        <>
          <SignificantEvents
            value={journalData.keyEvents}
            onChange={(value) =>
              setJournalData((currentData) => ({
                ...currentData,
                keyEvents: value,
              }))
            }
          />

          <Gratitude
            value={journalData.dailyGratitude}
            onChange={(value) =>
              setJournalData((currentData) => ({
                ...currentData,
                dailyGratitude: value,
              }))
            }
          />

          <button type="button" onClick={() => void handleSave()} disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </>
      ) : null}

      {saveMessage && (
        <p className={styles.successMessage} role="status">
          {saveMessage}
        </p>
      )}

      {saveError && (
        <p className={styles.errorMessage} role="alert">
          {saveError}
        </p>
      )}

      {isLoggedIn && isLoadingEntries ? (
        <p>Chargement de l'historique...</p>
      ) : isLoggedIn ? (
        <PreviousEntries
          entries={previousEntries}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      ) : null}
    </main>
  );
}
