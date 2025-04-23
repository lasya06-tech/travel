import React, { useState } from 'react';
import ViewFlightAdmin from './ViewFlightAdmin';

const UpdateFlightText = () => {
  const [adminFlightsData, setAdminFlightsData] = useState([
    {
      flightNumber: 'AI101',
      airline: 'Air India',
      from: 'DEL',
      to: 'BOM',
      departureTime: '10:00',
      arrivalTime: '12:00',
      duration: '2h',
      remarks: 'On time',
      availableSeats: 120,
    },
    {
      flightNumber: '6E202',
      airline: 'IndiGo',
      from: 'BLR',
      to: 'DEL',
      departureTime: '14:30',
      arrivalTime: '17:00',
      duration: '2h 30m',
      remarks: 'Delayed',
      availableSeats: 95,
    },
    // Add more flights as needed
  ]);

  const handleUpdateSeats = (flightNumber, action) => {
    setAdminFlightsData(prevData =>
      prevData.map(flight =>
        flight.flightNumber === flightNumber
          ? {
              ...flight,
              availableSeats:
                action === 'increment'
                  ? flight.availableSeats + 1
                  : Math.max(0, flight.availableSeats - 1),
            }
          : flight
      )
    );
  };

  return (
    <div>
      <ViewFlightAdmin adminFlightsData={adminFlightsData} onUpdateSeats={handleUpdateSeats}
      />
    </div>
  );
};

export default UpdateFlightText;
