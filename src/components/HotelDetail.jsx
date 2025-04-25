import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HotelDetail.css'; // Optional styling

const HotelDetail = ({ hotelsData }) => {
  const { id } = useParams();
  const hotel = hotelsData.find((h) => h.id.toString() === id);
  const [selectedBedType, setSelectedBedType] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]); // Track booked rooms from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the booked rooms from localStorage
    const storedBookedRooms = JSON.parse(localStorage.getItem('bookedRooms')) || [];
    setBookedRooms(storedBookedRooms);
  }, []);

  if (!hotel) return <p>Hotel not found.</p>;

  const selectedBed = hotel.bedDetails?.find(b => b.bedType === selectedBedType);

  const handleRoomSelection = (room) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(prev => prev.filter(r => r !== room)); // Deselect the room
    } else if (selectedRooms.length < parseInt(roomCount)) {
      setSelectedRooms(prev => [...prev, room]); // Select the room
    }
  };

  const handlePayNow = () => {
    const bookingDetails = {
      hotelName: hotel.name,
      selectedBedType,
      selectedRooms,
      totalAmount: selectedRooms.length * selectedBed.cost,
    };
  
    // Save booking details in localStorage for persistence
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
  
    // Show an alert with payment details
    alert(`Payment of ₹${bookingDetails.totalAmount} initiated for rooms: ${selectedRooms.join(', ')}`);
    
    // Optionally, add selected rooms to the bookedRooms state and update localStorage
    const updatedBookedRooms = [...bookedRooms, ...selectedRooms];
    setBookedRooms(updatedBookedRooms);
    localStorage.setItem('bookedRooms', JSON.stringify(updatedBookedRooms));
  };  

  const availableRooms = selectedBed?.roomNumbers.filter(
    room => !bookedRooms.includes(room)
  ) || [];

  const availableBedDetails = hotel.bedDetails?.map(bed => ({
    ...bed,
    roomNumbers: bed.roomNumbers.filter(room => !bookedRooms.includes(room))
  })) || [];

  return (
    <div className="hotel-details">
      <div className="hotel-info">
        <h2>{hotel.name}</h2>
        <img src={hotel.image} alt={hotel.name} className="hotel-image" />
        <p><strong>Location:</strong> {hotel.location}</p>
        <p><strong>Type:</strong> {hotel.type}</p>
        <p><strong>Available Rooms:</strong> {hotel.availableRooms}</p>
      </div>

      <div className="hotel-bed-details">
        {availableBedDetails && availableBedDetails.length > 0 ? (
          <>
            <label>Select Bed Type:</label>
            <select value={selectedBedType} onChange={(e) => {
              setSelectedBedType(e.target.value);
              setRoomCount('');
              setSelectedRooms([]);
            }}>
              <option value="">-- Select Bed Type --</option>
              {availableBedDetails.map((bed, index) => (
                <option key={index} value={bed.bedType}>
                  {bed.bedType} — ₹{bed.cost} — {bed.roomNumbers.length} rooms available
                </option>
              ))}
            </select>

            {selectedBed && (
              <>
                <label>Enter number of rooms you want:</label>
                <input
                  type="number"
                  min="1"
                  max={selectedBed.roomNumbers.length}
                  value={roomCount}
                  onChange={(e) => {
                    setRoomCount(e.target.value);
                    setSelectedRooms([]);
                  }}
                />

                {roomCount > 0 && (
                  <div className="room-selector">
                    <label>Select {roomCount} room(s):</label>
                    {availableRooms.map((room, i) => (
                      <div key={i}>
                        <input
                          type="checkbox"
                          checked={selectedRooms.includes(room)}
                          disabled={
                            !selectedRooms.includes(room) &&
                            selectedRooms.length >= parseInt(roomCount)
                          }
                          onChange={() => handleRoomSelection(room)}
                        />
                        <label>{room}</label>
                      </div>
                    ))}
                  </div>
                )}

                {selectedRooms.length === parseInt(roomCount) && (
                  <button className="pay-btn" onClick={handlePayNow}>
                    Pay Now – ₹{selectedRooms.length * selectedBed.cost}
                  </button>
                )}
              </>
            )}
          </>
        ) : (
          <p>No bed details available.</p>
        )}
      </div>
    </div>
  );
};

export default HotelDetail;