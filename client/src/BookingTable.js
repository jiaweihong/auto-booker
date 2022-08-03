import React, { useState, useEffect} from 'react'

const BookingTable = () => {
    const [pendingBookings, setPendingBookings] = useState([]);

    const getBookings = async () => {
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

    const deletePendingBooking = async (id) => {
        try {
            const deletePendingBooking = await fetch(`http://localhost:3000/api/pending_booking/${id}`, {
                method: "DELETE"
            }); 

            if (deletePendingBooking.status == 200){
                setPendingBookings(pendingBookings.filter(booking => {return booking.booking_id !== id}));
            } else {
                console.log("something went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getBookings();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="text-center">Pending bookings</h3>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Sport Centre</th>
                    <th scope="col">Activity</th>
                    <th scope="col">Date and Time</th>
                    </tr>
                </thead>

                <tbody>
                    {pendingBookings.map(booking => (
                        <tr key={booking.booking_id}>
                            <td>{booking.username}</td>
                            <td>{booking.sports_centre}</td>
                            <td>{booking.activity}</td>
                            <td>{`${booking.activity_day}/${booking.activity_month}/${booking.activity_year} ${booking.activity_hour}:00`}</td>
                            <td>
                                <button className='btn btn-warning'>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={() => {deletePendingBooking(booking.booking_id)}}>
                                    Warning
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default BookingTable;