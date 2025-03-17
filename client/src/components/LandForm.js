import React, { useState } from "react";
import Map from "./Map";

function LandForm({ token }) {
  const [formData, setFormData] = useState({ address: "", coordinates: [] });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/land/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) alert("Land submitted for approval!");
      else throw new Error("Submission failed");
    } catch (error) {
      console.error(error);
      alert("Error submitting land");
    }
  };

  return (
    <div className="land-form">
      <h2>Register Land</h2>
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <Map onCoordinatesChange={(coords) => setFormData({ ...formData, coordinates: coords })} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default LandForm;