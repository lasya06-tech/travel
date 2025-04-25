import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Payment = ({ onBookRooms }) => {
  const location = useLocation();
  const { hotelId, roomsToBook } = location.state || {};

  const handlePayment = () => {
    // Simulate payment success
    setTimeout(() => {
      if (hotelId && roomsToBook) {
        onBookRooms(hotelId, roomsToBook);
      }
      alert('Payment successful! Booking confirmed.');
      // Navigate to confirmation or home page if needed
    }, 1000);
  };

  useEffect(() => {
    handlePayment(); // Automatically process on component load
  }, []);

  return (
    <div>
      <h2>Processing your payment...</h2>
    </div>
  );
};

export default Payment;