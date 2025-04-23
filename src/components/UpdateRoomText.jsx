import React, { useState } from 'react';
import ViewHotelAdmin from './ViewHotelAdmin';

const UpdateRoomText = () => {
  const [adminHotelsData, setAdminHotelsData] = useState([
    {
      id: 1,
      name: 'Hotel 1',
      location: 'City A',
      image: 'hotel1.jpg',
      type: 'Luxury',
      availableRooms: 10,
      bedType: 'King',
      acType: 'AC',
    },
    {
      id: 2,
      name: 'Hotel 2',
      location: 'City B',
      image: 'hotel2.jpg',
      type: 'Budget',
      availableRooms: 5,
      bedType: 'Queen',
      acType: 'Non-AC',
    },
    // More hotels...
  ]);

  const handleUpdateRooms = (id, action) => {
    setAdminHotelsData((prevData) =>
      prevData.map((hotel) =>
        hotel.id === id
          ? {
              ...hotel,
              availableRooms:
                action === 'increment' ? hotel.availableRooms + 1 : hotel.availableRooms - 1,
            }
          : hotel
      )
    );
  };

  return <ViewHotelAdmin adminHotelsData={adminHotelsData} onUpdateRooms={handleUpdateRooms} />;
};

export default UpdateRoomText;