import BookingForm from './BookingForm'
import BookingTable from './BookingTable'
import React, { useState, useEffect } from 'react'


const App = () => {
  const [pendingBookings, setPendingBookings] = useState([]);

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
      <h1 className='text-center mt-5'>Auto Booker</h1>
      <BookingForm getPendingBookings={getPendingBookings}/>
      <BookingTable pendingBookings={pendingBookings} getPendingBookings={getPendingBookings}/>
    </>
  )
}

export default App;
