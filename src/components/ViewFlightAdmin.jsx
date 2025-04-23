import React from 'react';
import './ViewFlightAdmin.css';

const ViewFlightAdmin = ({ adminFlightsData, onUpdateSeats }) => {
  return (
    <div className="view-flight-container">
      <h2>Admin: Flight Listings</h2>
      <div className="flight-grid">
        {adminFlightsData.map((flight) => (
          <div className="flight-card" key={flight.flightNumber}>
            <h3>{flight.airline} - {flight.flightNumber}</h3>
            <p><strong>From:</strong> {flight.from}</p>
            <p><strong>To:</strong> {flight.to}</p>
            <p><strong>Departure:</strong> {flight.departureTime}</p>
            <p><strong>Arrival:</strong> {flight.arrivalTime}</p>
            <p><strong>Duration:</strong> {flight.duration}</p>
            <p><strong>Remarks:</strong> {flight.remarks || 'N/A'}</p>
            <div className="seat-control">
              <button onClick={() => onUpdateSeats(flight.flightNumber, 'decrement')}>−</button>
              <span>{flight.availableSeats} Seats</span>
              <button onClick={() => onUpdateSeats(flight.flightNumber, 'increment')}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewFlightAdmin;