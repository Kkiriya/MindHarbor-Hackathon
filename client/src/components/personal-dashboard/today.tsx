import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.tsx";

export default function Today() {
    const {token} = useAuth();

    const [journalCompleted, setJournalCompleted] = useState<boolean|null>(null);

    useEffect(() => {
        async function checkTodayJournal() {
            if (!token) {
                return;
            }

            const today = new Date();

            const localDate = [
                today.getFullYear(),
                String(today.getMonth()+1).padStart(2,"0"),
                String(today.getDate()).padStart(2,"0")
            ].join("-");

            try {
                await axios.get(
                    `http://localhost:3000/api/v1/journal/${localDate}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setJournalCompleted(true);
            } catch (error) {
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 404
                ) {
                    setJournalCompleted(false);
                } else {
                    console.error("Error checking today's journal:", error);
                }
            }
        }
        checkTodayJournal();
    }, [token]);

    if (!token) {
        return <p>Connecte-toi pour voir ton journal</p>;
    }

    if (journalCompleted == null) {
        return <p>Chargement...</p>;
    }

    return (
        <section>
            <h2>Journal d’aujourd’hui</h2>

            {journalCompleted ? (
                <p> ✅ Ton journal est rempli.</p>
            ) : (
                <p> ❌ Ton journal n’est pas encore rempli.</p>
            )}
        </section>
    )
}
