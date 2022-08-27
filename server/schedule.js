// everyday at 8:55 AM UK, it will execute a function called scheduleAllTodayJobs()
// ScheduleAllTodayJobs() will loop through the entire database and check the bookings that need to be processed for today
// For every booking that needs to be processed today, it creates a scheduled job that will run bookActivity with the data.
const pool = require('./db.js');
const CronJob = require('cron').CronJob;
const bookActivity = require('./bookActivity.js');


const job = new CronJob(
	'11 9 * * *',
    async () => {
        console.log("uk");
    },
	null,
	false,
    'Europe/London'
);

const scheduleAllBookingsToday = async () => {
    try {
        const dateToday = new Date();
        
        const allBookings = await pool.query(`SELECT * FROM booking WHERE activity_day = ${dateToday.getDate()} AND activity_month = ${dateToday.getMonth() + 1} AND activity_year = ${dateToday.getFullYear()} AND is_booked = ${false}`);

        console.log(allBookings.rows);
        
        if (allBookings.rows.length >= 1){
            const bookingPromises = [];
        
            allBookings.rows.forEach((booking) => {
                bookingPromises.push(bookActivity(booking));
            });
        
            const result = await Promise.allSettled(bookingPromises);

            await updateDatabaseAfterExecutingBooking(result);
        } else {
            console.log("No bookings to be made today.");
        }
    } catch (error) {
        console.log(error);
    }
}

const updateDatabaseAfterExecutingBooking = async (results) => {
    results.forEach(async (result) => {
        try {
            let is_success;
    
            if (result.status == 'rejected'){
                is_success = false;
                const updateBooking = await pool.query(`UPDATE booking SET is_booked = ${true}, is_success = ${is_success}, result_message = '${result.reason.msg}' WHERE booking_id = ${result.reason.booking_id}`);
            } else if (result.status == 'fulfilled'){
                is_success = true;
                const updateBooking = await pool.query(`UPDATE booking SET is_booked = ${true}, is_success = ${is_success}, result_message = '${result.value.message}' WHERE booking_id = ${result.value.booking_id}`);
            }
        } catch (error) {
            console.log(error);
        }
    })
}

scheduleAllBookingsToday();



