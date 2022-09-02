import React, { useState } from 'react'

const PendingBookingTable = ({pendingBookings, getPendingBookings, alertArr, setAlertArr}) => {
    let [page, setPage] = useState(1);
    const entriesPerPage = 7;
    const deletePendingBooking = async (id) => {
        try {
            const res = await fetch(`/api/pending_booking/${id}`, {
                method: "DELETE"
            }); 

           
            getPendingBookings();

            updateAlertArr(res.status);
        } catch (error) {
            console.error(error)
        }
    }

    const getLastEntryNumberBasedOnCurrentPage = () => {
        if (page * entriesPerPage < pendingBookings.length){
            return page * entriesPerPage;
        } else {
            return pendingBookings.length;
        }
    }

    const updateAlertArr = (status) => { 
        let alert = '';
        
        if (status === 200) {
            alert = (<div className="alert alert-success" role="alert">
                Booking has been succesfully deleted
            </div>)
        } else {
            alert = (<div className="alert alert-danger" role="alert">
                Booking failed to delete. Please try again
            </div>)
        }
        
        setAlertArr(
            () => [...alertArr, alert]
        )

        removeRecentlyAddedAlertWithDelay(alert)
    }
    
    const removeRecentlyAddedAlertWithDelay = (alert) => {
        setTimeout(() => {
            let alertDivArr = document.querySelectorAll('div.alert');
            
            let count = 0;
            let tempAlert = alertDivArr[count];

            while (alert !== tempAlert){
                tempAlert = alertDivArr[++count];
            }
        }, 5000)
    }


    return (
        <div className="container mt-5">
            <h3 className="text-center">Pending bookings</h3>

            <table className="table table-striped">
                <thead>
                    <tr className="table-dark">
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
                                    </tr>
                                )
                            }
                        })
                    
                    }
                </tbody>
            </table>

            <div className="row">
                <div className="col text-muted">Showing {page * entriesPerPage - (entriesPerPage-1)} to {getLastEntryNumberBasedOnCurrentPage()} of {pendingBookings.length} bookings</div>

                <div className="col">
                    <ul className="pagination">
                        <li className="page-item ms-auto">
                            <button className="page-link" onClick={() => {page >= 2 ? setPage(--page) : console.log(page)}}>
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        <li className="page-item">
                            <button className="page-link" aonClick={() => { page <= Math.ceil(pendingBookings.length/entriesPerPage) - 1 ? setPage(++page) : console.log(page)}}>
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </div>  
            </div>

            {
                alertArr.map((alert) => {
                    return (alert)
                })
            }
        </div>
    )
}

export default PendingBookingTable;