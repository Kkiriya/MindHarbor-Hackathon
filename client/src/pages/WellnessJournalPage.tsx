import GeneralWellness from "../components/wellness-journal/GeneralWellness.tsx";
import PreviousEntries from "../components/wellness-journal/PreviousEntries.tsx";
import DailyActivities from "../components/wellness-journal/DailyActivities.tsx";
import SignificantEvents from "../components/wellness-journal/SignificantEvents.tsx";
import Gratitude from "../components/wellness-journal/Gratitude.tsx";
import styles from "./WellnessJournal.module.css";

export default function WellnessJournalPage() {
    return (
        <main className={styles.wellnessJournal}>
            <header>
                <h1>Journal de bien-être</h1>
                <time>Date</time>
            </header>

            <GeneralWellness/>
            <DailyActivities/>
            <SignificantEvents/>
            <Gratitude/>
            <button>Enregistrer</button>
            <PreviousEntries/>
        </main>
    )
}
