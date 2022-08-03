import React, { useState } from 'react'

const BookingTable = ({pendingBookings, getPendingBookings}) => {

    let [page, setPage] = useState(1);
    const entriesPerPage = 5;
    const deletePendingBooking = async (id) => {
        try {
            const deletePendingBooking = await fetch(`http://localhost:3000/api/pending_booking/${id}`, {
                method: "DELETE"
            }); 

           
            getPendingBookings();
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="container mt-5">
            <h3 className="text-center">Pending bookings</h3>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Sport Centre</th>
                    <th scope="col">Activity</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        pendingBookings.map((booking, index) => { 
                            if (index >= page * entriesPerPage - entriesPerPage && index < page * entriesPerPage) {
                                return (
                                    <tr key={booking.booking_id}>
                                        <td>{booking.username}</td>
                                        <td>{booking.sports_centre}</td>
                                        <td>{booking.activity}</td>
                                        <td>{`${booking.activity_day < 10 ? "0"+booking.activity_day : booking.activity_day}/${booking.activity_month < 10 ? "0"+booking.activity_month : booking.activity_month}/${booking.activity_year}`}</td>
                                        <td>{`${booking.activity_hour}:00`}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => {deletePendingBooking(booking.booking_id)}}>
                                                Delete
                                            </button>
                                        </td>
                                        <td>{index}</td>
                                    </tr>
                                )
                            }
                        })
                    
                    }
                </tbody>

                <nav>
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" onClick={() => {page >= 2 ? setPage(--page) : console.log(page)}}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" onClick={() => { page <= Math.ceil(pendingBookings.length/entriesPerPage) - 1 ? setPage(++page) : console.log(page)}}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </table>

        </div>
    )
}

export default BookingTable;