import React, { useState } from "react";
import Map from "./Map";

function LandForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ address: "", coordinates: [] });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/land/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      {step === 1 && (
        <>
          <h2>Step 1: Enter Land Details</h2>
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <button onClick={handleNext}>Next</button>
        </>
      )}
      {step === 2 && (
        <>
          <h2>Step 2: Mark Your Land</h2>
          <Map onCoordinatesChange={(coords) => setFormData({ ...formData, coordinates: coords })} />
          <button onClick={handlePrev}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default LandForm;