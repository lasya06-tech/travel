import React from 'react';
import './ViewHotelAdmin.css';

const ViewHotelAdmin = ({ adminHotelsData, onUpdateRooms }) => {
  return (
    <div className="view-hotel-container">
      <h2>Admin: Hotel Listings</h2>
      <div className="hotel-grid">
        {adminHotelsData.map((hotel) => (
          <div className="hotel-card" key={hotel.id}>
            <img src={hotel.image} alt={hotel.name} />
            <h3>{hotel.name}</h3>
            <p><strong>Location:</strong> {hotel.location}</p>
            <p><strong>Type:</strong> {hotel.type}</p>
            <p><strong>Bed:</strong> {hotel.bedType}</p>
            <p><strong>AC:</strong> {hotel.acType}</p>
            <p><strong>Available Rooms:</strong> {hotel.availableRooms}</p>
            <div className="room-control">
              <button onClick={() => onUpdateRooms(hotel.id, 'decrement')}>−</button>
              <span>{hotel.availableRooms} Rooms</span>
              <button onClick={() => onUpdateRooms(hotel.id, 'increment')}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewHotelAdmin;