import React, { useEffect, useState } from "react";

const BookingStats = () => {
    const [numPendingBookings, setNumPendingBookings] = useState(0);
    const [numFailedBookings, setNumFailedBookings] = useState(0);
    const [numSuccessfulBooking, setNumSuccessfulBooking] = useState(0);

    const getNumPendingBookings = async () => {
        const res = await fetch("http://localhost:3000/api/number_pending_bookings");
        const numPendingBookings = await res.json();
        
        setNumPendingBookings(numPendingBookings.count);
    }

    const getNumFailedBookings = async () => {
        const res = await fetch("http://localhost:3000/api/number_failed_bookings");
        const numFailedBookings = await res.json();
        
        setNumFailedBookings(numFailedBookings.count);
    }

    const getNumSuccessfulBooking = async () => {
        const res = await fetch("http://localhost:3000/api/number_successful_bookings");
        const numSuccessfulBookings = await res.json();
        
        setNumSuccessfulBooking(numSuccessfulBookings.count);
    }

    useEffect(() => {
        getNumPendingBookings();
        getNumFailedBookings();
        getNumSuccessfulBooking();
    }, [])

    return (
        <div className="container mt-5">
            <h3 className="text-center">
                Booking Statistics
            </h3>
            
            <div className="row text-center mt-2">
                <div className="col">
                    <h4 className="text-secondary">Pending</h4>
                    <h5>{numPendingBookings}</h5>
                </div>

                <div className="col">
                    <h4 className="text-success">Success</h4>
                    <h5>{numSuccessfulBooking}</h5>
                </div>

                <div className="col">
                    <h4 className="text-danger">Failure</h4>
                    <h5>{numFailedBookings}</h5>
                </div>
            </div>
        </div>
    )
}

export default BookingStats;