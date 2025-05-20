import express from 'express';
import bookAppointment from '@services/booking/bookAppointment';
import getAppointments from '@services/booking/getAppointments';
import getAvailableHours from '@services/booking/getAvailableHours';
const bookingRouter = express.Router();

// Gets all booked appointment dates
bookingRouter.get('/', async (req, res) => {

    const bookedDates = await getAppointments();

    res.json(bookedDates);
});

// Gets available hours for specific date
bookingRouter.put('/available-hours', async (req, res) => {

    // Ex. format: 2023-10-01
    const { date, bookedHours } = req.body;
    const availableHours = await getAvailableHours(date, bookedHours);

    res.json(availableHours);
});

// Books an appointment
bookingRouter.post('/', async (req, res) => {
    const { customerName, customerPhone, customerEmail, service, date, note, hour } = req.body;

    // Here you would typically save the booking to a database
    const appointment = await bookAppointment(service, date, customerName, customerPhone, customerEmail, note, hour);

    if (appointment == "hour-already-booked" ) {
        res.status(200).json({ message: 'hour-already-booked' });
        return
    }

    res.status(200).json({ message: 'Booking successful' });
});

export default bookingRouter;