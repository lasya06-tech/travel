import React, { useState } from "react";

function AdminCab({ adminCabsData, onToggleAvailability }) {
  // Local state for availability, initialized from adminCabsData
  const [cabs, setCabs] = useState(adminCabsData);

  // Handle availability toggle for a specific car
  const handleAvailabilityToggle = (cabId, currentAvailability) => {
    const updatedCabs = cabs.map((cab) =>
      cab.id === cabId
        ? { ...cab, available: !currentAvailability } // Toggle availability
        : cab
    );
    setCabs(updatedCabs); // Update the local state
    onToggleAvailability(cabId); // Call the parent function with cabId
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin View – Cabs</h2>
      {cabs.length === 0 ? (
        <p>No cabs available.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {cabs.map((cab) => (
            <div
              key={cab.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                width: "220px",
                background: "#f9f9f9",
                boxSizing: "border-box",
              }}
            >
              <img
                src={cab.imageUrl}
                alt="cab"
                style={{
                  width: "100%",
                  height: "130px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <h3 style={{ fontSize: "1.1em" }}>{cab.driverName}</h3>
              <p>
                <strong>Car Number:</strong> {cab.carNumber}
              </p>
              <p>
                <strong>From:</strong> {cab.from}
              </p>
              <p>
                <strong>To:</strong> {cab.to}
              </p>
              <p>
                <strong>Cost:</strong> ${cab.cost} {/* Display the cost */}
              </p>
              <p>
                <strong>Available:</strong> {cab.available ? "Yes" : "No"}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => handleAvailabilityToggle(cab.id, cab.available)}
                  style={{
                    padding: "5px 10px",
                    fontSize: "0.8em",
                    backgroundColor: cab.available ? "#dc3545" : "#28a745", // Change color based on availability
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {cab.available ? "Set Unavailable" : "Set Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminCab;