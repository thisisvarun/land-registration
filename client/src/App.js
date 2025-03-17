import React, { useState } from "react";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashBoard";
import GovDashboard from "./components/GovDashboard";

function App() {
  const [user, setUser] = useState(null); // { token, role }

  const handleLogin = (token, role) => setUser({ token, role });
  const handleLogout = () => setUser(null);

  return (
    <div className="app">
      <h1>Land Registration System</h1>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : user.role === "government" ? (
        <GovDashboard token={user.token} onLogout={handleLogout} />
      ) : (
        <UserDashboard token={user.token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;