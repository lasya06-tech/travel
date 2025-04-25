import React, { useState } from 'react';
import './AddHotel.css';

const AddHotel = ({ onAddHotel }) => {
  const [hotel, setHotel] = useState({
    name: '',
    location: '',
    image: '',
    type: '',
    availableRooms: '',
    bedDetails: [], // Array to hold bed types and their respective counts and room numbers
    roomNumbers: [], // This will be an array of room numbers linked to bed types
    roomCost: '', // This will be moved to bed details
    currentRoomNumber: '', // Input for room number
    currentBedType: 'AC-2BED', // Default bed type
    currentBedCount: '', // Input field for current bed count
    currentBedCost: '', // Input field for the cost of the selected bed type
  });

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleAddRoomNumber = () => {
    if (hotel.currentRoomNumber) {
      setHotel({
        ...hotel,
        roomNumbers: [...hotel.roomNumbers, hotel.currentRoomNumber],
        currentRoomNumber: '', // Reset room number input
      });
    }
  };

  const handleAddBedDetail = () => {
    if (hotel.currentBedCount && hotel.currentBedType && hotel.roomNumbers.length > 0 && hotel.currentBedCost) {
      const newBedDetail = {
        bedType: hotel.currentBedType,
        count: hotel.currentBedCount,
        roomNumbers: [...hotel.roomNumbers], // Associate the room numbers with this bed type
        cost: hotel.currentBedCost, // Add cost for this bed type
      };
      setHotel({
        ...hotel,
        bedDetails: [...hotel.bedDetails, newBedDetail],
        currentBedType: 'AC-2BED', // Reset bed type to default
        currentBedCount: '', // Reset bed count input
        currentBedCost: '', // Reset cost input
        roomNumbers: [], // Reset room numbers after adding the bed detail
        currentRoomNumber: '', // Reset room number input
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddHotel(hotel); // Add hotel to the parent component
    alert('Hotel added successfully!');
    setHotel({
      name: '',
      location: '',
      image: '',
      type: '',
      availableRooms: '',
      bedDetails: [],
      roomNumbers: [],
      roomCost: '',
      currentRoomNumber: '',
      currentBedType: 'AC-2BED', 
      currentBedCount: '', 
      currentBedCost: '', // Reset cost
    });
  };

  return (
    <div className="admin-container">
      <div className="form-card">
        <h2>Add New Hotel</h2>
        <form onSubmit={handleSubmit}>
          <label>Hotel Name:</label>
          <input type="text" name="name" value={hotel.name} onChange={handleChange} required />

          <label>Hotel Location:</label>
          <input type="text" name="location" value={hotel.location} onChange={handleChange} required />

          <label>Hotel Image URL:</label>
          <input type="url" name="image" value={hotel.image} onChange={handleChange} required />

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

          <label>Type of Beds Available:</label>
          <select name="currentBedType" value={hotel.currentBedType} onChange={handleChange}>
            <option value="AC-2BED">AC-2BED</option>
            <option value="AC-3BED">AC-3BED</option>
            <option value="NONAC-2BED">NONAC-2BED</option>
            <option value="NONAC-3BED">NONAC-3BED</option>
            <option value="AC-4BED">AC-4BED</option>
            <option value="NONAC-4BED">NONAC-4BED</option>
            <option value="SUPER-LUXURY">SUPER-LUXURY</option>
          </select>

          <label>Number of Rooms for Selected Bed Type:</label>
          <input
            type="number"
            value={hotel.currentBedCount}
            onChange={(e) => setHotel({ ...hotel, currentBedCount: e.target.value })}
            placeholder="Enter Number of Rooms"
          />

          <label>Room Number for this Bed Type:</label>
          <input
            type="number"
            value={hotel.currentRoomNumber}
            onChange={(e) => setHotel({ ...hotel, currentRoomNumber: e.target.value })}
            placeholder="Enter Room Number"
          />
          <button type="button" onClick={handleAddRoomNumber}>Add Room Number</button>

          <label>Cost per Room for this Bed Type:</label>
          <input
            type="number"
            value={hotel.currentBedCost}
            onChange={(e) => setHotel({ ...hotel, currentBedCost: e.target.value })}
            placeholder="Enter Room Cost"
          />

          <button type="button" onClick={handleAddBedDetail}>Add Bed Type</button>

          <div>
            <h4>Bed Details:</h4>
            <ul>
              {hotel.bedDetails.map((bed, index) => (
                <li key={index}>
                  {bed.bedType}: {bed.count} rooms, Rooms: {bed.roomNumbers.join(', ')}, Cost: ${bed.cost}
                </li>
              ))}
            </ul>
          </div>

          <button type="submit">Add Hotel</button>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;
