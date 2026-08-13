import './App.css'
import {Routes, Route} from "react-router-dom";
import PersonalDashboardPage from "./pages/PersonalDashboardPage.tsx";
import WellnessJournalPage from "./pages/WellnessJournalPage.tsx";
import Header from "./components/layout/Header.tsx";

//TODO: Check why the dashboard page don't load
function App() {

    return (
        <>
            <Header/>

            <Routes>
                <Route path="/personal-dashboard" element={<PersonalDashboardPage/>}/>
                <Route path="/wellness-journal" element={<WellnessJournalPage/>}/>
            </Routes>
        </>
    )
}

export default App