import React, { useState, useEffect} from 'react'

const BookingTable = () => {
    const [bookings, setBookings] = useState([]);

    const getBookings = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/bookings");
    
            console.log(await res.json());
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBookings()
    }, []);
    

    return (
        <div className="container mt-5">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BookingTable;