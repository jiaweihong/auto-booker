
import Navbar from './Navbar.js'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [alertArr, setAlertArr] = useState([]);

  const getPendingBookings = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/pending_bookings");
        const pendingBookings = await res.json();
        
        sortBookingsEarliestDate(pendingBookings);

        setPendingBookings(pendingBookings);
    } catch (error) {
        console.error(error);
    }
  }

  
  const sortBookingsEarliestDate = (pendingBookings) => {
    pendingBookings.sort((a,b) => {
      let dateA = new Date(a.activity_year, a.activity_month, a.activity_day, a.activity_hour);
      let dateB = new Date(b.activity_year, b.activity_month, b.activity_day, b.activity_hour);
      
      return dateB - dateA;
    })
  }
  
  useEffect(() => {
    getPendingBookings();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />} >
          <Route path='/' element={<BookingForm />}></Route>
          <Route path='/' element={<PendingBookingTable />}></Route>
          <Route path='/' element={<PastBookingTable />}></Route>
          <Route path='/'element={<BookingStats />}></Route>


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
