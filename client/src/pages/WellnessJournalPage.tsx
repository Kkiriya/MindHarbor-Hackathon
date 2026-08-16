import GeneralWellness from "../components/wellness-journal/GeneralWellness.tsx";
import PreviousEntries from "../components/wellness-journal/PreviousEntries.tsx";
import DailyActivities from "../components/wellness-journal/DailyActivities.tsx";
import SignificantEvents from "../components/wellness-journal/SignificantEvents.tsx";
import Gratitude from "../components/wellness-journal/Gratitude.tsx";
import styles from "./WellnessJournal.module.css";
import {useEffect, useState} from "react";
import type {Activity, JournalEntryData, JournalEntry} from "../types/WellnessJournalTypes.ts";
import {useAuth} from "../context/AuthContext.tsx";
import axios from "axios";


/**
 * WellnessJournalPage component that renders the wellness journal page.
 * journalData must have the same structure as JournalEntryData type.
 * @constructor
 */
export default function WellnessJournalPage() {
    const [journalData, setJournalData] = useState<JournalEntryData>({
        energyLevel: 0,
        generalMood: 0,
        sleepQuality: 0,
        stressLevel: 0,
        keyEvents: "",
        dailyGratitude: "",
    });

    const [selectedActivitiesId, setSelectedActivitiesId] = useState<string[]>([]);

    const {token} = useAuth();
    const [previousEntries, setPreviousEntries] = useState<JournalEntry[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        async function loadPreviousEntries() {
            if (!token) {
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/journal",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            page: currentPage,
                            limit: 5,
                        }
                    }
                );

                setPreviousEntries(response.data.data);
                setTotalPages(response.data.meta.totalPages);
            } catch (error) {
                console.error(
                    "Unable to load previous entries:",
                    error
                );
            }
        }

        loadPreviousEntries();
    }, [token, currentPage]);

    function handlePreviousPage() {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    function handleNextPage() {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }

    useEffect(() => {
        async function loadActivities() {
            if (!token) {
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/activities",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setActivities(response.data.data);
            } catch (error) {
                console.error(
                    "Unable to load activities:",
                    error
                );
            }
        }

        loadActivities();
    }, [token]);

    /**
     * Handles changes to the wellness data state.
     * @param field The field of the wellness data to update.
     * @param value The new value for the specified field.
     */
    function handleWellnessChange(field: keyof JournalEntryData, value: number) {
        setJournalData((currentData) => ({
            // Spread the current data to keep other fields unchanged
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
    function handleSignificantEventsChange(value: string) {
        setJournalData((currentData) => ({
            ...currentData,
            keyEvents: value,
        }));
    }

    function handleGratitudeChange(value: string) {
        setJournalData((currentData) => ({
            ...currentData,
            dailyGratitude: value,
        }));
    }

    function handleSave() {
        const newEntry: JournalEntry = {
            journalId: crypto.randomUUID(),
            date: new Date().toISOString(),
            ...journalData,
        };
        console.log("Données du journal à enregistrer :", newEntry);
    }

    return (
        <main className={styles.wellnessJournal}>
            <header>
                <h1>Journal de bien-être</h1>
                <time>{new Date().toLocaleDateString()}</time>
            </header>

            <GeneralWellness
                data={journalData}
                onChange={handleWellnessChange}
            />

            <DailyActivities
                activities={activities}
                selectedActivitiesId={selectedActivitiesId}
                onChange={handleActivityChange}
            />

            <SignificantEvents
                value={journalData.keyEvents}
                onChange={handleSignificantEventsChange}
            />

            <Gratitude
                value={journalData.dailyGratitude}
                onChange={handleGratitudeChange}
            />

            <button type="button" onClick={handleSave}>Enregistrer</button>

            <PreviousEntries
                entries={previousEntries}
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
            />

        </main>
    )
}
