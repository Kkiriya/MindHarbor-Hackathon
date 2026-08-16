import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.tsx";
import type {Activity} from "../../types/WellnessJournalTypes.ts";
import styles from "./dashboard.module.css";

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
    const {token} = useAuth();
    const [status, setStatus] = useState<JournalStatus>("loading");
    const [suggestion, setSuggestion] = useState<Activity | null>(null);

    useEffect(() => {
        async function checkTodayJournal() {
            if (!token) {
                return;
            }

            setStatus("loading");

            try {
                await axios.get(
                    `http://localhost:3000/api/v1/journal/${getLocalDate()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                setStatus("completed");
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setStatus("missing");
                } else {
                    console.error("Error checking today's journal:", error);
                    setStatus("error");
                }
            }
        }

        checkTodayJournal();
    }, [token]);

    useEffect(() => {
        async function loadSuggestion() {
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
                    },
                );

                const activities: Activity[] = response.data.data;

                if (activities.length > 0) {
                    const suggestionIndex = new Date().getDate() % activities.length;
                    setSuggestion(activities[suggestionIndex]);
                }
            } catch (error) {
                console.error("Unable to load today's suggestion:", error);
            }
        }

        loadSuggestion();
    }, [token]);

    if (!token) {
        return (
            <section className={styles.dashboardSection}>
                <h2>Aujourd’hui</h2>
                <article className={styles.card}>
                    <h3>Journal d’aujourd’hui</h3>
                    <p>Connecte-toi pour consulter ton journal.</p>
                </article>
            </section>
        );
    }

    return (
        <section className={styles.dashboardSection}>
            <h2>Aujourd’hui</h2>

            <div className={styles.dashboardGrid}>
                <article className={styles.card}>
                    <h3>Journal d’aujourd’hui</h3>

                    {status === "loading" && <p>Vérification du journal...</p>}

                    {status === "completed" && (
                        <>
                            <p className={styles.positiveStatus}>✓ Ton journal est rempli.</p>
                            <p>Tu peux consulter ou modifier ton entrée d’aujourd’hui.</p>
                            <Link className={styles.actionLink} to="/wellness-journal">
                                Voir mon journal
                            </Link>
                        </>
                    )}

                    {status === "missing" && (
                        <>
                            <p className={styles.missingStatus}>Ton journal n’est pas encore rempli.</p>
                            <p>Prends quelques minutes pour faire le point.</p>
                            <Link className={styles.actionLink} to="/wellness-journal">
                                Remplir mon journal
                            </Link>
                        </>
                    )}

                    {status === "error" && (
                        <p className={styles.errorMessage}>Impossible de vérifier le journal.</p>
                    )}
                </article>

                <article className={styles.card}>
                    <h3>Suggestion du jour</h3>

                    {suggestion ? (
                        <>
                            <p className={styles.suggestionName}>♡ {suggestion.name}</p>
                            <p>{suggestion.desc}</p>
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
