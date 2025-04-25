import React, { useState } from 'react';
import './Flights.css';
import { useNavigate } from 'react-router-dom';

const Flights = ({ flights }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    tripType: 'one-way',
  });

  const [flightData, setFlightData] = useState(flights);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleBooking = (index, seatsToBook) => {
    const seatNum = parseInt(seatsToBook, 10);
    if (isNaN(seatNum) || seatNum <= 0) {
      alert("Enter a valid seat number");
      return;
    }

    const updatedFlights = [...flightData];
    if (updatedFlights[index].availableSeats >= seatNum) {
      updatedFlights[index].availableSeats -= seatNum;
      setFlightData(updatedFlights);

      const bookingDetails = {
        flight: updatedFlights[index],
        seatsBooked: seatNum,
        totalAmount: seatNum * 5000, // Assume a fixed amount per seat
      };

      // Store the booking details in localStorage
      localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

      alert(`Successfully booked ${seatNum} seat(s) on ${updatedFlights[index].flightNumber}`);
      navigate('/payment');
    } else {
      alert('Not enough seats available!');
    }
  };

  // Filter flights based on search criteria with safe date comparison
  const filteredFlights = flightData.filter((flight) => {
    const dep = flight.departureTime ? flight.departureTime.slice(0, 10) : '';
    const arr = flight.arrivalTime ? flight.arrivalTime.slice(0, 10) : '';

    return (
      (search.from === '' || flight.from === search.from) &&
      (search.to === '' || flight.to === search.to) &&
      (search.departureDate === '' || dep >= search.departureDate) &&
      (search.tripType === 'round-trip'
        ? search.returnDate && arr <= search.returnDate
        : true)
    );
  });

  return (
    <div className="flight-display">
      <h2>Search Flights</h2>
      <div className="search-bar">
        <select name="from" value={search.from} onChange={handleChange}>
          <option value="">From</option>
          <option value="DEL">Delhi (DEL)</option>
          <option value="BOM">Mumbai (BOM)</option>
          <option value="BLR">Bangalore (BLR)</option>
        </select>

        <select name="to" value={search.to} onChange={handleChange}>
          <option value="">To</option>
          <option value="DEL">Delhi (DEL)</option>
          <option value="BOM">Mumbai (BOM)</option>
          <option value="BLR">Bangalore (BLR)</option>
        </select>

        <select name="tripType" value={search.tripType} onChange={handleChange}>
          <option value="one-way">One Way</option>
          <option value="round-trip">Round Trip</option>
        </select>

        <input 
          type="date" 
          name="departureDate" 
          value={search.departureDate} 
          onChange={handleChange} 
        />

        {search.tripType === 'round-trip' && (
          <input 
            type="date" 
            name="returnDate" 
            value={search.returnDate} 
            onChange={handleChange} 
          />
        )}
      </div>

      <div className="flight-list">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <div key={index} className="flight-card">
              <h4>{flight.flightNumber} – {flight.airline}</h4>
              <p>From: {flight.from} | To: {flight.to}</p>
              <p>Departure: {flight.departureTime} | Arrival: {flight.arrivalTime}</p>
              <p>Duration: {flight.duration}</p>
              <p>Remarks: {search.tripType === 'round-trip' ? 'Round-trip available' : 'One-way flight'}</p>
              <p>Available Seats: {flight.availableSeats}</p>

              <div className="booking-form">
                <input
                  type="number"
                  min="1"
                  max={flight.availableSeats}
                  placeholder="Seats"
                  id={`seats-${index}`}
                />
                <button onClick={() => {
                  const seats = document.getElementById(`seats-${index}`).value;
                  handleBooking(index, seats);
                }}>
                  Book
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No flights match the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Flights;