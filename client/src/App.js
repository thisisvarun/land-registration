import React, { useState } from "react";
import LandForm from "./components/LandForm";
import GovDashboard from "./components/GovDashboard";

function App() {
  const [userRole, setUserRole] = useState("citizen"); // Simulate role, replace with auth logic

  return (
    <div className="app">
      <h1>Land Registration System</h1>
      {userRole === "citizen" ? <LandForm /> : <GovDashboard />}
      <button onClick={() => setUserRole(userRole === "citizen" ? "government" : "citizen")}>
        Switch Role (Demo)
      </button>
    </div>
  );
}

export default App;