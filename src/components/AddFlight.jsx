import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddFlight = ({ onAddFlight }) => {
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: '',
    airline: '',
    from: '',
    to: '',
    departureDateTime: '',
    arrivalDateTime: '',
    duration: '',
    remarks: '',
    availableSeats: 0,
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails({
      ...flightDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFlight = {
      ...flightDetails,
      departureTime: flightDetails.departureDateTime,
      arrivalTime: flightDetails.arrivalDateTime,
    };
    onAddFlight(formattedFlight);
    setFlightDetails({
      flightNumber: '',
      airline: '',
      from: '',
      to: '',
      departureDateTime: '',
      arrivalDateTime: '',
      duration: '',
      remarks: '',
      availableSeats: 0,
    });
    navigate('/viewflights');  // Navigate to view flights after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="flightNumber"
        placeholder="Flight Number"
        value={flightDetails.flightNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="airline"
        placeholder="Airline"
        value={flightDetails.airline}
        onChange={handleChange}
      />
      <input
        type="text"
        name="from"
        placeholder="From"
        value={flightDetails.from}
        onChange={handleChange}
      />
      <input
        type="text"
        name="to"
        placeholder="To"
        value={flightDetails.to}
        onChange={handleChange}
      />
      <input
        type="date"
        name="departureDateTime"
        value={flightDetails.departureDateTime}
        onChange={handleChange}
      />
      <input
        type="date"
        name="arrivalDateTime"
        value={flightDetails.arrivalDateTime}
        onChange={handleChange}
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={flightDetails.duration}
        onChange={handleChange}
      />
      <input
        type="text"
        name="remarks"
        placeholder="Remarks"
        value={flightDetails.remarks}
        onChange={handleChange}
      />
      <input
        type="number"
        name="availableSeats"
        placeholder="Available Seats"
        value={flightDetails.availableSeats}
        onChange={handleChange}
      />
      <button type="submit">Add Flight</button>
    </form>
  );
};

export default AddFlight;