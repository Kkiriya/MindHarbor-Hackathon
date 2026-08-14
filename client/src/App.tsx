import './App.css'
import {Routes, Route} from "react-router-dom";
import PersonalDashboardPage from "./pages/PersonalDashboardPage.tsx";
import WellnessJournalPage from "./pages/WellnessJournalPage.tsx";
import AnalysisPage from "./pages/AnalysisPage.tsx";
import Header from "./components/layout/Header.tsx";

function App() {

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/personal-dashboard" element={<PersonalDashboardPage/>}/>
                <Route path="/wellness-journal" element={<WellnessJournalPage/>}/>
                <Route path="/analysis" element={<AnalysisPage/>}/>
            </Routes>
        </>
    )
}

export default App