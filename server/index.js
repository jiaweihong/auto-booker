const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

console.log("Database_URL", process.env.DATABASE_URL);


if (process.env.NODE_ENV === "production") {
   app.use(express.static("../client/build"));
}

app.get('/api/pending_bookings', async (req, res) => {
    try {
        const pendingBookings = await pool.query(`SELECT * FROM booking WHERE is_booked=${false}`);

        res.json(pendingBookings.rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/past_bookings', async (req, res) => {
    try {
        const pastBookings = await pool.query(`SELECT * FROM booking WHERE is_booked=${true}`);

        res.json(pastBookings.rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/number_pending_bookings', async (req, res) => {
    try {
        const numOfPendingBookings = await pool.query(`SELECT COUNT(*) FROM booking WHERE is_booked=${false}`);

        res.json(numOfPendingBookings.rows[0]);
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/number_successful_bookings', async (req, res) => {
    try {
        const numOfPendingBookings = await pool.query(`SELECT COUNT(*) FROM booking WHERE is_booked=${true} AND is_success=${true}`);

        res.json(numOfPendingBookings.rows[0]);
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/number_failed_bookings', async (req, res) => {
    try {
        const numOfPendingBookings = await pool.query(`SELECT COUNT(*) FROM booking WHERE is_booked=${true} AND is_success=${false}`);

        res.json(numOfPendingBookings.rows[0]);
    } catch (error) {
        console.error(error)
    }
})


app.post('/api/bookings', async (req, res) => {
    try {
        const {username} = req.body;
        const {password} = req.body;
        const {sportsCentre} = req.body;
        const {activity} = req.body;
        const {activityDay} = req.body;
        const {activityMonth} = req.body;
        const {activityYear} = req.body;
        const {activityHour} = req.body;
        
        const addToBook = await pool.query(`INSERT INTO booking(username, password, sports_centre, activity, activity_day, activity_month, activity_year, activity_hour) VALUES ('${username}', '${password}', '${sportsCentre}', '${activity}', ${activityDay}, ${activityMonth}, ${activityYear}, ${activityHour}) RETURNING *`);

        res.json(addToBook.rows[0]);
    } catch (error) {
        console.error(error);
    }
})

app.put('/api/bookings/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const {sportsCentre} = req.body;
        const {activity} = req.body;
        const {activityDay} = req.body;
        const {activityMonth} = req.body;
        const {activityYear} = req.body;
        const {activityHour} = req.body;

        const updateToBook = await pool.query(`UPDATE booking SET sports_centre = '${sportsCentre}', activity = '${activity}', activity_day = ${activityDay}, activity_month = ${activityMonth}, activity_year = ${activityYear}, activity_hour = ${activityHour} WHERE booking_id = ${id}`);

        res.json("Booking updated");
    } catch (error) {
        console.error(error);
    }
})

app.delete('/api/pending_booking/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteToBook = await pool.query(`DELETE FROM booking WHERE booking_id = ${id}`);
    
        res.json("Succesfully deleted");
    } catch (error) {
        console.error(error);
    }
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})


