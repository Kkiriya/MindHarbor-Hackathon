import Today from "../components/personal-dashboard/today.tsx";
import Week from "../components/personal-dashboard/week.tsx";
import Notifications from "../components/personal-dashboard/notifcations.tsx";

export default function PersonalDashboardPage() {
    return (
        <main>
            <h1>Bonjour</h1>
            <p>Voici un aperçu de ta semaine</p>

            <Today/>
            <Week/>
            <Notifications/>
        </main>
    )
}