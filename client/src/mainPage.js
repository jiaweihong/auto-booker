import BookingForm from './BookingForm'
import PendingBookingTable from './PendingBookingTable'
import BookingStats from './BookingStats'
import PastBookingTable from './PastBookingTable'

const mainPage = () => {
    return (
        <>
            <BookingForm />
            <PendingBookingTable />
            <PastBookingTable />
            <BookingStats />
        </>
    )
}

export default mainPage;