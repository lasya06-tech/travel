import React, { useState } from 'react';
import './Flights.css';
import { useNavigate } from 'react-router-dom';

const Flights = ({ flights }) => {
    const navigate = useNavigate(); // ✅ hook to navigate
  const [search, setSearch] = useState({
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: ''
  });

  const [flightData, setFlightData] = useState(flights);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleBooking = (index, seatsToBook) => {
    const seatNum = parseInt(seatsToBook, 10);
    if (isNaN(seatNum) || seatNum <= 0) return alert("Enter a valid seat number");

    const updatedFlights = [...flightData];
    if (updatedFlights[index].availableSeats >= seatNum) {
      updatedFlights[index].availableSeats -= seatNum;
      setFlightData(updatedFlights);
      alert(`Successfully booked ${seatNum} seat(s) on ${updatedFlights[index].flightNumber}`);
      navigate('/payment'); // ✅ Navigate to payment
    } else {
      alert('Not enough seats available!');
    }
  };

  const filteredFlights = flightData.filter((flight) => {
    return (
      (search.from === '' || flight.from === search.from) &&
      (search.to === '' || flight.to === search.to) &&
      (search.departureTime === '' || flight.departureTime >= search.departureTime) &&
      (search.arrivalTime === '' || flight.arrivalTime <= search.arrivalTime)
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

        <input type="time" name="departureTime" value={search.departureTime} onChange={handleChange} />
        <input type="time" name="arrivalTime" value={search.arrivalTime} onChange={handleChange} />
      </div>

      <div className="flight-list">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <div key={index} className="flight-card">
              <h4>{flight.flightNumber} – {flight.airline}</h4>
              <p>From: {flight.from} | To: {flight.to}</p>
              <p>Departure: {flight.departureTime} | Arrival: {flight.arrivalTime}</p>
              <p>Duration: {flight.duration}</p>
              <p>Remarks: {flight.remarks}</p>
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
