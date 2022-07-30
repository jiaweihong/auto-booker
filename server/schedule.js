// everyday at 8:55 AM UK, it will execute a function called scheduleAllTodayJobs()
// ScheduleAllTodayJobs() will loop through the entire database and check the bookings that need to be processed for today
// For every booking that needs to be processed today, it creates a scheduled job that will run bookActivity with the data.
const pool = require('./db.js');
const CronJob = require('cron').CronJob;
const bookActivity = require('./bookActivity.js');


const job = new CronJob(
	'* * * * *',
    function() {
		console.log(new Date());
	},
	null,
	false,
);



const scheduleAllBookingsToday = async () => {
    try {
        const dateToday = new Date();
    
        const allBookings = await pool.query(`SELECT * FROM to_book WHERE activity_day = ${dateToday.getDate()} AND activity_month = ${dateToday.getMonth()} AND activity_year = ${dateToday.getFullYear()}`);
    
        const bookingPromises = [];
    
        allBookings.rows.forEach((booking) => {
            bookingPromises.push(bookActivity(booking));
        });
    
        const result = await Promise.allSettled(bookingPromises)       
    } catch (error) {
        console.log(error);
    }
}

scheduleAllBookingsToday();



