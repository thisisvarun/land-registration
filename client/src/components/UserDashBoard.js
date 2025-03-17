import React, { useState } from "react";
import LandForm from "./LandForm";

function UserDashboard({ token, onLogout }) {
  const [view, setView] = useState(null);

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
      <div>
        <button onClick={() => setView("buy")}>Buy Land</button>
        <button onClick={() => setView("sell")}>Sell Land</button>
        <button onClick={() => setView("register")}>Register Land</button>
      </div>
      {view === "buy" && <p>Buy functionality coming soon!</p>}
      {view === "sell" && <p>Sell functionality coming soon!</p>}
      {view === "register" && <LandForm token={token} />}
    </div>
  );
}

export default UserDashboard;