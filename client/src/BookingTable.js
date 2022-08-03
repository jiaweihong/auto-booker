import React from 'react'

const BookingTable = ({pendingBookings, getPendingBookings}) => {
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
                    {pendingBookings.map(booking => (
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
                        </tr>
                    ))}
                </tbody>


                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
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