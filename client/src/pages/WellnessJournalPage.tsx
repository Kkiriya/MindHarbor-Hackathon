import GeneralWellness from "../components/wellness-journal/GeneralWellness.tsx";
import PreviousEntries from "../components/wellness-journal/PreviousEntries.tsx";
import DailyActivities from "../components/wellness-journal/DailyActivities.tsx";
import SignificantEvents from "../components/wellness-journal/SignificantEvents.tsx";
import Gratitude from "../components/wellness-journal/Gratitude.tsx";
import styles from "./WellnessJournal.module.css";
import {useState} from "react";
import type {WellnessData} from "../types/WellnessJournalTypes.ts";

export default function WellnessJournalPage() {
    const [wellnessData, setWellnessData] = useState<WellnessData>({
        mood: 0,
        energy: 0,
        sleep: 0,
        stress: 0,
    });

    /**
     * Handles changes to the wellness data state.
     * @param field The field of the wellness data to update.
     * @param value The new value for the specified field.
     */
    function handleWellnessChange(field: keyof WellnessData, value: number) {
        setWellnessData((currentData) => ({
            ...currentData,
            [field]: value,
        }));
    }

    function handleSave() {
        console.log("Données du journal à enregistrer :", wellnessData);
    }

    return (
        <main className={styles.wellnessJournal}>
            <header>
                <h1>Journal de bien-être</h1>
                <time>{new Date().toLocaleDateString()}</time>
            </header>

            <GeneralWellness
                data={wellnessData}
                onChange={handleWellnessChange}
            />
            <DailyActivities/>
            <SignificantEvents/>
            <Gratitude/>
            <button type="button" onClick={handleSave}>Enregistrer</button>
            <PreviousEntries/>
        </main>
    )
}
