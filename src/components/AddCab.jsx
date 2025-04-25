import React, { useState } from 'react';
import './AddCab.css';

const AddCab = ({ onAddCab }) => {
  const [cab, setCab] = useState({
    carNumber: '',
    driverName: '',
    from: '',
    to: '',
    image: '',
    available: true,
    cost: '', // Added cost field to state
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCab({ ...cab, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCab({ ...cab, id: Date.now() }); // Unique ID
    alert('Cab added successfully!');
    setCab({
      carNumber: '',
      driverName: '',
      from: '',
      to: '',
      image: '',
      available: true,
      cost: '', // Reset the cost field as well
    });
  };

  return (
    <div className="admin-container">
      <div className="form-card">
        <h2>Add New Cab</h2>
        <form onSubmit={handleSubmit}>
          <label>Car Number:</label>
          <input
            type="text"
            name="carNumber"
            value={cab.carNumber}
            onChange={handleChange}
            required
          />

          <label>Driver Name:</label>
          <input
            type="text"
            name="driverName"
            value={cab.driverName}
            onChange={handleChange}
            required
          />

          <label>From:</label>
          <input
            type="text"
            name="from"
            value={cab.from}
            onChange={handleChange}
            required
          />

          <label>To:</label>
          <input
            type="text"
            name="to"
            value={cab.to}
            onChange={handleChange}
            required
          />

          <label>Cab Image URL:</label>
          <input
            type="url"
            name="image"
            value={cab.image}
            onChange={handleChange}
            required
          />

          <label>Cost:</label>
          <input
            type="number"
            name="cost"
            value={cab.cost}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />

          <label>
            <input
              type="checkbox"
              name="available"
              checked={cab.available}
              onChange={handleChange}
            />
            Available
          </label>

          <button type="submit">Add Cab</button>
        </form>
      </div>
    </div>
  );
};

export default AddCab;