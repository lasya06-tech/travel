import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useParams } from 'react-router-dom';
import './HotelDetail.css';

const HotelDetail = ({ hotelsData, onBookRooms }) => {
  const { id } = useParams();
  const hotel = hotelsData.find((h) => h.id === parseInt(id));
  const [roomsToBook, setRoomsToBook] = useState(1);
  const navigate = useNavigate(); 

  if (!hotel) {
    return <h2>Hotel not found</h2>;
  }

  const handleBooking = () => {
    if (roomsToBook > 0 && roomsToBook <= hotel.availableRooms) {
      // Book the rooms
      onBookRooms(hotel.id, roomsToBook);
      
      // Notify the user about successful booking
      alert(`Successfully booked ${roomsToBook} room(s)!`);
  
      // Redirect to the payment page
      navigate('/payment');
    } else {
      // If the room number is invalid, alert the user
      alert('Invalid number of rooms selected. Please select a valid number.');
    }
  };  

  return (
    <div className="detail-container">
      <div className="left-detail">
        <img src={hotel.image} alt={hotel.name} className="detail-image" />
        <h2>{hotel.name}</h2>
        <p><strong>Location:</strong> {hotel.location}</p>
        <p><strong>Type:</strong> {hotel.type}</p>
        <p><strong>Stars:</strong> {hotel.stars} Star</p>
        <p><strong>Available Rooms:</strong> {hotel.availableRooms}</p>
        <p><strong>Bed Type:</strong> {hotel.bedType}</p>
        <p><strong>AC/Non-AC:</strong> {hotel.acType}</p>
        <p>{hotel.description}</p>
      </div>
      <div className="right-booking">
        <h3>Book Your Stay</h3>
        <p>Starting from $99/night</p>
        <input
          type="number"
          value={roomsToBook}
          min="1"
          max={hotel.availableRooms}
          onChange={(e) => setRoomsToBook(parseInt(e.target.value))}
        />
        <button className="book-button" onClick={handleBooking}>Book Now</button>
      </div>
    </div>
  );
};

export default HotelDetail;
