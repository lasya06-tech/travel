import React, { useState } from 'react';
import './AddHotel.css';

const AddHotel = ({ onAddHotel }) => {
  const [hotel, setHotel] = useState({
    name: '',
    location: '',
    image: '',
    type: '',
    availableRooms: '',
    bedType: '',
    acType: '', // AC or Non-AC
  });

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddHotel(hotel); // Add the hotel to the list in parent component
    alert('Hotel added successfully!');
    setHotel({ name: '', location: '', image: '', type: '', availableRooms: '', bedType: '', acType: '' }); // Reset the form
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

          <label>Available Rooms:</label>
          <input
            type="number"
            name="availableRooms"
            value={hotel.availableRooms}
            onChange={handleChange}
            required
          />

          <label>Bed Type:</label>
          <input
            type="text"
            name="bedType"
            value={hotel.bedType}
            onChange={handleChange}
            placeholder="e.g., Single, Double, Queen, King"
            required
          />

          <label>AC/Non-AC:</label>
          <select
            name="acType"
            value={hotel.acType}
            onChange={handleChange}
            required
          >
            <option value="">Select AC Type</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>

          <button type="submit">Add Hotel</button>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;