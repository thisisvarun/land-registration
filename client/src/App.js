import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandForm from "./components/LandForm";
import GovDashboard from "./components/GovDashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandForm />} />
                <Route path="/dashboard" element={<GovDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
