import React, { useEffect, useState } from 'react';
import './Status.css';

const Status = () => {
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const storedBookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    setBookingDetails(storedBookingDetails);
  }, []);

  return (
    <div className="status-container">
      {bookingDetails ? (
        <div className="booking-info">
          <h2>Booking Status</h2>

          {/* Hotel Info (if present) */}
          {bookingDetails.hotelName && (
            <>
              <p><strong>Hotel:</strong> {bookingDetails.hotelName}</p>
              <p><strong>Bed Type:</strong> {bookingDetails.selectedBedType}</p>
              <p><strong>Booked Rooms:</strong> {bookingDetails.selectedRooms?.join(', ')}</p>
              <p><strong>Total Hotel Amount:</strong> ₹{bookingDetails.totalAmount}</p>
            </>
          )}

          {/* Cab Info (if present) */}
          {bookingDetails.cabNumber && (
            <>
              <hr />
              <p><strong>Cab Number:</strong> {bookingDetails.cabNumber}</p>
              <p><strong>Driver:</strong> {bookingDetails.driver}</p>
              <p><strong>Route:</strong> {bookingDetails.route}</p>
              <p><strong>Cab Cost:</strong> ₹{bookingDetails.cabCost}</p>
            </>
          )}

          {/* Flight Info (if present) */}
          {bookingDetails.flightNumber && (
            <>
              <hr />
              <p><strong>Flight Number:</strong> {bookingDetails.flightNumber}</p>
              <p><strong>Departure:</strong> {bookingDetails.departureTime}</p>
              <p><strong>Arrival:</strong> {bookingDetails.arrivalTime}</p>
              <p><strong>Seats Booked:</strong> {bookingDetails.seatsBooked}</p>
            </>
          )}
        </div>
      ) : (
        <p className="no-details">No booking details found.</p>
      )}
    </div>
  );
};

export default Status;
