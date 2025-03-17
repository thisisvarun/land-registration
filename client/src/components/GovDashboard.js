import React, { useEffect, useState } from "react";
import Map from "./Map";

function GovDashboard({ token, onLogout }) {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/land/pending", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLands(data))
      .catch((err) => console.error(err));
  }, [token]);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/land/approve/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setLands(lands.filter((land) => land._id !== id));
        alert("Land approved!");
      }
    } catch (error) {
      console.error(error);
      alert("Error approving land");
    }
  };

  return (
    <div className="gov-dashboard">
      <h2>Government Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
      <ul>
        {lands.map((land) => (
          <li key={land._id}>
            {land.address} - <button onClick={() => setSelectedLand(land)}>View</button> -{" "}
            <button onClick={() => handleApprove(land._id)}>Approve</button>
          </li>
        ))}
      </ul>
      {selectedLand && (
        <div>
          <h3>Selected Land: {selectedLand.address}</h3>
          <Map coordinates={selectedLand.coordinates} />
        </div>
      )}
    </div>
  );
}

export default GovDashboard;