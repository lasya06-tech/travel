import React from 'react';
import { useLocation } from 'react-router-dom';
import './CabDetail.css';

const CabDetails = () => {
  const location = useLocation();
  const { cab } = location.state || {}; // Retrieve the passed cab data

  if (!cab) {
    return <p>Cab details not found.</p>;
  }

  const handlePayment = () => {
    // Fetch current booking details (hotel + cab if any)
    const existingData = JSON.parse(localStorage.getItem('bookingDetails')) || {};
    
    // Add cab data
    const updatedBookingDetails = {
      ...existingData,
      cabNumber: cab.carNumber,
      driver: cab.driverName,
      route: `${cab.from} to ${cab.to}`,
      cabCost: cab.cost,
    };

    localStorage.setItem('bookingDetails', JSON.stringify(updatedBookingDetails));
    alert(`You are paying $${cab.cost} for the selected cab!`);
  };

  return (
    <div className="cab-detail-page">
      <div className="cab-details-left">
        <h2>{cab.driverName}'s Cab Details</h2>
        <img src={cab.image} alt={cab.carNumber} />
        <div className="cab-info">
          <p><strong>Cab Number:</strong> {cab.carNumber}</p>
          <p><strong>Driver:</strong> {cab.driverName}</p>
          <p><strong>From:</strong> {cab.from}</p>
          <p><strong>To:</strong> {cab.to}</p>
          <p><strong>Cost:</strong> ${cab.cost}</p>
          <p><strong>Available:</strong> {cab.available ? 'Yes' : 'No'}</p>
        </div>
        <button onClick={handlePayment} className="pay-now-button">
          Pay Now: ${cab.cost}
        </button>
      </div>
    </div>
  );
};

export default CabDetails;
