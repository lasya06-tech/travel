import React, { useState } from 'react';
import './AddHotel.css';

const AddHotel = ({ onAddHotel }) => {
  const [hotel, setHotel] = useState({
    name: '',
    location: '',
    image: '',
    type: '',
  });

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddHotel(hotel); // Add the hotel to the list in parent component
    alert('Hotel added successfully!');
    setHotel({ name: '', location: '', image: '', type: '' }); // Reset the form
  };

  return (
    <div className="admin-container">
      <div className="form-card">
        <h2>Add New Hotel</h2>
        <form onSubmit={handleSubmit}>
          <label>Hotel Name:</label>
          <input
            type="text"
            name="name"
            value={hotel.name}
            onChange={handleChange}
            required
          />

          <label>Hotel Location:</label>
          <input
            type="text"
            name="location"
            value={hotel.location}
            onChange={handleChange}
            required
          />

          <label>Hotel Image URL:</label>
          <input
            type="url"
            name="image"
            value={hotel.image}
            onChange={handleChange}
            required
          />

          <label>Hotel Type:</label>
          <input
            type="text"
            name="type"
            value={hotel.type}
            onChange={handleChange}
            placeholder="e.g., Luxury, Budget, Boutique"
            required
          />

          <button type="submit">Add Hotel</button>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;