import BookingForm from './BookingForm'
import PendingBookingTable from './PendingBookingTable'
import BookingStats from './BookingStats'
import PastBookingTable from './PastBookingTable'
import { useState, useEffect } from 'react'

const MainPage = () => {
    const [pendingBookings, setPendingBookings] = useState([]);
    const [alertArr, setAlertArr] = useState([]);

    const getPendingBookings = async () => {
    try {
        const res = await fetch("/api/pending_bookings");
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
            <BookingForm getPendingBookings={getPendingBookings} alertArr={alertArr} setAlertArr={setAlertArr}/>
            <PendingBookingTable pendingBookings={pendingBookings} getPendingBookings={getPendingBookings} alertArr={alertArr} setAlertArr={setAlertArr}/>
            <PastBookingTable/>
            <BookingStats />
        </>
    )
}

export default MainPage;