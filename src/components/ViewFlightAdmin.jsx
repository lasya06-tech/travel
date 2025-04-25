import React from 'react';

const ViewFlightAdmin = ({ flights = [] }) => {
  if (!Array.isArray(flights)) {
    return <p>Invalid flight data</p>;
  }

  return (
    <div>
      <h2>Available Flights</h2>
      {flights.length === 0 ? (
        <p>No flights available</p>
      ) : (
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              <strong>{flight.airline}</strong> - {flight.flightNumber} <br />
              From: {flight.from} ➡ To: {flight.to} <br />
              Departure: {flight.departureTime} | Arrival: {flight.arrivalTime} <br />
              Duration: {flight.duration} | Available Seats: {flight.availableSeats} <br />
              Remarks: {flight.remarks}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFlightAdmin;