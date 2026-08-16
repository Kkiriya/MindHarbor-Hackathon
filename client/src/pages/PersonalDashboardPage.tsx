import Today from "../components/personal-dashboard/today.tsx";
import Week from "../components/personal-dashboard/week.tsx";
import Notifications from "../components/personal-dashboard/notifcations.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import styles from "../components/personal-dashboard/dashboard.module.css";

export default function PersonalDashboardPage() {
    const {user} = useAuth();

    return (
        <main className={styles.dashboard}>
            <header className={styles.introduction}>
                <h1>
                    Bonjour{user ? ` ${user.firstName} ${user.lastName}` : ""}
                </h1>
                <p>Voici un aperçu de ta semaine.</p>
            </header>

            <Today/>

            <section className={styles.dashboardSection}>
                <h2>Cette semaine</h2>

                <div className={styles.dashboardGrid}>
                    <Week/>

                    <article className={styles.card}>
                        <h3>Prochains événements de groupe</h3>
                        <p>Aucun événement de groupe disponible pour le moment.</p>
                    </article>
                </div>
            </section>

            <Notifications/>
        </main>
    );
}
