import GeneralWellness from "../components/wellness-journal/GeneralWellness.tsx";
import PreviousEntries from "../components/wellness-journal/PreviousEntries.tsx";
import DailyActivities from "../components/wellness-journal/DailyActivities.tsx";
import SignificantEvents from "../components/wellness-journal/SignificantEvents.tsx";
import Gratitude from "../components/wellness-journal/Gratitude.tsx";
import styles from "./WellnessJournal.module.css";
import {useState} from "react";
import type {Activity, JournalEntry} from "../types/WellnessJournalTypes.ts";

const placeholderActivities: Activity[] = [
    {
        activityId: "a1b2c3d4-0001-4000-8000-000000000001",
        name: "Exercice",
        desc: "Même une courte marche ou quelques étirements comptent!",
    },
    {
        activityId: "a1b2c3d4-0002-4000-8000-000000000002",
        name: "Méditation",
        desc: "Quelques minutes pour respirer et recentrer ton attention.",
    },
    {
        activityId: "a1b2c3d4-0003-4000-8000-000000000003",
        name: "Lecture",
        desc: "Un livre, un article ou une bande dessinée : tout compte.",
    },
    {
        activityId: "a1b2c3d4-0004-4000-8000-000000000004",
        name: "Activités sociales",
        desc: "Une conversation ou un moment passé avec quelqu’un.",
    },
    {
        activityId: "a1b2c3d4-0005-4000-8000-000000000005",
        name: "Loisirs",
        desc: "Une activité pratiquée simplement pour le plaisir.",
    },
    {
        activityId: "a1b2c3d4-0006-4000-8000-000000000006",
        name: "Repos",
        desc: "Prendre une vraie pause est aussi bénéfique.",
    },
];

export default function WellnessJournalPage() {
    const [wellnessData, setWellnessData] = useState<JournalEntry>({
        mood: 0,
        energy: 0,
        sleep: 0,
        stress: 0,
    });

    const [selectedActivitiesId, setSelectedActivitiesId] = useState<string[]>([]);


    /**
     * Handles changes to the wellness data state.
     * @param field The field of the wellness data to update.
     * @param value The new value for the specified field.
     */
    function handleWellnessChange(field: keyof JournalEntry, value: number) {
        setWellnessData((currentData) => ({
            ...currentData,
            [field]: value,
        }));
    }

    /**
     * Handles changes to the selected activities state.
     * @param activityId The ID of the activity that was changed.
     * @param checked A boolean indicating whether the activity was selected (true) or deselected (false).
     */
    function handleActivityChange (activityId: string, checked: boolean) {
        setSelectedActivitiesId((currentIds) =>
            checked
                ? [...currentIds, activityId]
                : currentIds.filter((id) => id !== activityId)
        );
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

            <DailyActivities
                activities={placeholderActivities}
                selectedActivitiesId={selectedActivitiesId}
                onChange={handleActivityChange}
            />

            <SignificantEvents/>
            <Gratitude/>
            <button type="button" onClick={handleSave}>Enregistrer</button>
            <PreviousEntries/>
        </main>
    )
}
