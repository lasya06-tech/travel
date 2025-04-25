import React from 'react';
import './ViewHotelAdmin.css';

const ViewHotelAdmin = ({ adminHotelsData, onUpdateRooms }) => {
  const handleRoomUpdate = (hotelId, action, bedType) => {
    const hotel = adminHotelsData.find(h => h.id === hotelId);
    if (!hotel) return;

    const bed = hotel.bedDetails.find(b => b.bedType === bedType);
    if (!bed) return;

    if (action === 'increment') {
      const newRoom = prompt(`Enter new room number for ${bedType}:`);
      if (newRoom && !bed.roomNumbers.includes(newRoom)) {
        bed.roomNumbers.push(newRoom);
        bed.count += 1;
      } else {
        alert('Room number is either empty or already exists!');
        return;
      }
    } else if (action === 'decrement' && bed.count > 0) {
      const lastRoom = bed.roomNumbers.pop(); // remove last added room
      console.log(`Removed room: ${lastRoom}`);
      bed.count -= 1;
    }

    // Recalculate total available rooms
    hotel.availableRooms = hotel.bedDetails.reduce((sum, b) => sum + b.count, 0);

    onUpdateRooms(hotelId, hotel);
  };

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

            <p><strong>Bed Types:</strong></p>
            {Array.isArray(hotel.bedDetails) && hotel.bedDetails.length > 0 ? (
              <ul>
                {hotel.bedDetails.map((bed, index) => (
                  <li key={index}>
                    {bed.bedType} — ${bed.cost} per room — {bed.count} rooms<br />
                    <strong>Room Numbers:</strong>{' '}
                    {bed.roomNumbers.length > 0
                      ? bed.roomNumbers.join(', ')
                      : 'No rooms added for this type'}

                    <div className="room-control small">
                      <button onClick={() => handleRoomUpdate(hotel.id, 'decrement', bed.bedType)}>-</button>
                      <span>{bed.count} rooms</span>
                      <button onClick={() => handleRoomUpdate(hotel.id, 'increment', bed.bedType)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bed details available.</p>
            )}

            <p><strong>Total Available Rooms:</strong> {hotel.availableRooms}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewHotelAdmin;
