import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import Signup from './components/Signup';
import './index.css';
import Login from './components/Login';
import HotelAdmin from './components/HotelAdmin';
import FlightAdmin from './components/FlightAdmin';
import AddHotel from './components/AddHotel';
import Hotels from './components/Hotels';
import hotelImage from './assets/hotel1.jpg';
import hotelImage1 from './assets/hotel2.jpg';
import hotelImage2 from './assets/hotel4.avif';
import hotelImage3 from './assets/hotel.jpg';
import HotelDetail from './components/HotelDetail';
import ViewHotelAdmin from './components/ViewHotelAdmin';
import Payment from './components/Payment';
import AddFlight from './components/AddFlight';
import Flights from './components/Flights';
import ViewFlightAdmin from './components/ViewFlightAdmin';
import CabAdmin from './components/CabAdmin'
import AddCab from './components/AddCab'
import Cabs from './components/Cabs';

function App() {
  const hiddenNavRoutes = ['/hoteldashboard', '/flightdashboard','/cabdashboard'];

  const defaultHotels = [
    {
      id: 1,
      name: 'Sunshine Grand',
      location: 'New York, USA',
      type: 'Luxury Hotel',
      stars: 5,
      image: hotelImage,
      availableRooms: 20,
      bedType: 'King Size',
      acType: 'AC',
      description: 'An opulent stay in the heart of New York, offering world-class services and facilities.',
    },
    {
      id: 2,
      name: 'Ocean Breeze',
      location: 'Goa, India',
      type: 'Beach Resort',
      stars: 4,
      image: hotelImage1,
      availableRooms: 30,
      bedType: 'Double Bed',
      acType: 'AC',
      description: 'A serene beachfront resort where you can relax and unwind by the sea.',
    },
    {
      id: 3,
      name: 'Mountain View Inn',
      location: 'Zermatt, Switzerland',
      type: 'Budget Stay',
      stars: 3,
      image: hotelImage2,
      availableRooms: 15,
      bedType: 'Single Bed',
      acType: 'Non-AC',
      description: 'A budget-friendly stay with breathtaking views of the Alps and easy access to ski resorts.',
    },
    {
      id: 4,
      name: 'Cityscape Suites',
      location: 'Tokyo, Japan',
      type: 'Urban Hotel',
      stars: 5,
      image: hotelImage3,
      availableRooms: 10,
      bedType: 'Queen Size',
      acType: 'AC',
      description: 'A modern, luxury hotel located in the heart of Tokyo, offering panoramic city views.',
    },
  ];

  const [flightData, setFlightData] = useState(() => {
    const storedFlights = localStorage.getItem('flightData');
    return storedFlights ? JSON.parse(storedFlights) : [
      {
        flightNumber: 'AI202',
        airline: 'Air India',
        from: 'DEL',
        to: 'BOM',
        departureTime: '09:30',
        arrivalTime: '11:45',
        duration: '2h 15m',
        remarks: 'On Time',
        availableSeats: 120,
      },
      {
        flightNumber: '6E101',
        airline: 'IndiGo',
        from: 'BLR',
        to: 'DEL',
        departureTime: '14:00',
        arrivalTime: '16:30',
        duration: '2h 30m',
        remarks: 'Delayed',
        availableSeats: 130,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('flightData', JSON.stringify(flightData));
  }, [flightData]);

  const handleAddFlight = (newFlight) => {
    setFlightData((prevData) => [...prevData, newFlight]);
  };

  const [hotelsData, setHotelsData] = useState(() => {
    const storedHotels = localStorage.getItem('hotelsData');
    return storedHotels ? JSON.parse(storedHotels) : defaultHotels;
  });

  useEffect(() => {
    localStorage.setItem('hotelsData', JSON.stringify(hotelsData));
  }, [hotelsData]);

  const handleAddHotel = (newHotel) => {
    const updatedHotels = [
      ...hotelsData,
      { ...newHotel, id: hotelsData.length + 1 },
    ];
    setHotelsData(updatedHotels);
  };

  const handleUpdateRooms = (id, type) => {
    const updatedHotels = hotelsData.map((hotel) =>
      hotel.id === id
        ? {
            ...hotel,
            availableRooms: type === 'increment'
              ? hotel.availableRooms + 1
              : Math.max(0, hotel.availableRooms - 1),
          }
        : hotel
    );
    setHotelsData(updatedHotels);
  };

  const handleBookRooms = (id, roomsToBook) => {
    const updatedHotels = hotelsData.map((hotel) =>
      hotel.id === id
        ? {
            ...hotel,
            availableRooms: Math.max(0, hotel.availableRooms - roomsToBook),
          }
        : hotel
    );
    setHotelsData(updatedHotels);
  };

  const handleUpdateSeats = (flightNumber, type) => {
    const updatedFlights = flightData.map((flight) =>
      flight.flightNumber === flightNumber
        ? {
            ...flight,
            availableSeats:
              type === 'increment'
                ? flight.availableSeats + 1
                : Math.max(0, flight.availableSeats - 1),
          }
        : flight
    );
    setFlightData(updatedFlights);
  };
  const [cabsData, setCabsData] = useState(() => {
    const storedCabs = localStorage.getItem('cabsData');
    return storedCabs ? JSON.parse(storedCabs) : [];
  });

  useEffect(() => {
    localStorage.setItem('cabsData', JSON.stringify(cabsData));
  }, [cabsData]);

  const handleAddCab = (newCab) => {
    setCabsData((prevData) => [...prevData, newCab]);
  };

  return (
    <Router>
      <RouteHandler
        hiddenNavRoutes={hiddenNavRoutes}
        hotelsData={hotelsData}
        onAddHotel={handleAddHotel}
        onUpdateRooms={handleUpdateRooms}
        onBookRooms={handleBookRooms}
        flightData={flightData}
        onAddFlight={handleAddFlight} // Pass onAddFlight to AddFlight
        onUpdateSeats={handleUpdateSeats} // ✅ pass this prop
        onAddCab={handleAddCab}
        cabsData={cabsData}  /* Add this line */
      />
    </Router>
  );
}

function RouteHandler({
  hiddenNavRoutes,
  hotelsData,
  onAddHotel,
  onUpdateRooms,
  onBookRooms,
  flightData,
  onAddFlight,
  onUpdateSeats,
  onAddCab,
  cabsData, // Add cabsData here
}) {
  const location = useLocation();
  const isNavVisible = !hiddenNavRoutes.includes(location.pathname);

  return (
    <>
      {isNavVisible && <Nav />}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hoteldashboard" element={<HotelAdmin />} />
        <Route path="/flightdashboard" element={<FlightAdmin />} />
        <Route path="/addhotel" element={<AddHotel onAddHotel={onAddHotel} />} />
        <Route path="/hotels" element={<Hotels hotelsData={hotelsData} />} />
        <Route path="/hotels/:id" element={<HotelDetail hotelsData={hotelsData} onBookRooms={onBookRooms} />} />
        <Route path="/viewhotels" element={<ViewHotelAdmin adminHotelsData={hotelsData} onUpdateRooms={onUpdateRooms} />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/addflight" element={<AddFlight onAddFlight={onAddFlight} />} /> {/* Pass onAddFlight to AddFlight */}
        <Route path="/flights" element={<Flights flights={flightData} />} />
        <Route path="/viewflights" element={<ViewFlightAdmin adminFlightsData={flightData} onUpdateSeats={onUpdateSeats} />} />
        <Route path="/cabdashboard" element={<CabAdmin />}/>
        <Route path="/addcabs" element={<AddCab onAddCab={onAddCab} />} />
        <Route path="/cabs" element={<Cabs cabsData={cabsData} />} />
      </Routes>
    </>
  );
}

export default App;