import React, { useState } from 'react';
import './AddFlight.css';


const AddFlight = ({ onAddFlight }) => {
  const [flight, setFlight] = useState({
    flightNumber: '',
    airline: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    remarks: '',
    availableSeats: ''  // Added availableSeats state
  });

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Flight Added:", flight);
    alert("Flight added successfully!");

    // Call the onAddFlight prop to update the flight data in the parent component
    onAddFlight(flight);

    // Reset form fields after submitting
    setFlight({
      flightNumber: '',
      airline: '',
      from: '',
      to: '',
      departureTime: '',
      arrivalTime: '',
      duration: '',
      remarks: '',
      availableSeats: ''  // Reset availableSeats field
    });
  };

  return (
    <div className="flight-container">
      <h2 className="flight-heading">Add New Flight</h2>
      <form onSubmit={handleSubmit} className="flight-form">
        <div className="input-group">
          <label>Flight Number:</label>
          <input type="text" name="flightNumber" value={flight.flightNumber} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Airline:</label>
          <input type="text" name="airline" value={flight.airline} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>From:</label>
          <select name="from" value={flight.from} onChange={handleChange} required>
            <option value="">Select Departure</option>
            <option value="DEL">Delhi (DEL)</option>
            <option value="BOM">Mumbai (BOM)</option>
            <option value="BLR">Bangalore (BLR)</option>
          </select>
        </div>

        <div className="input-group">
          <label>To:</label>
          <select name="to" value={flight.to} onChange={handleChange} required>
            <option value="">Select Arrival</option>
            <option value="DEL">Delhi (DEL)</option>
            <option value="BOM">Mumbai (BOM)</option>
            <option value="BLR">Bangalore (BLR)</option>
          </select>
        </div>

        <div className="input-group">
          <label>Departure Time:</label>
          <input type="time" name="departureTime" value={flight.departureTime} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Arrival Time:</label>
          <input type="time" name="arrivalTime" value={flight.arrivalTime} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Duration:</label>
          <input type="text" name="duration" placeholder="e.g. 2h 30m" value={flight.duration} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Remarks:</label>
          <textarea name="remarks" value={flight.remarks} onChange={handleChange} rows="3" />
        </div>

        <div className="input-group">
          <label>Available Seats:</label>
          <input type="number" name="availableSeats" value={flight.availableSeats} onChange={handleChange} required min="0" />
        </div>

        <button type="submit" className="submit-button">Add Flight</button>
      </form>
    </div>
  );
};

export default AddFlight;
