import express from 'express';
import bookAppointment from '@services/booking/bookAppointment';
import getAppointments from '@services/booking/getAppointments';
import getAvailableHours from '@services/booking/getAvailableHours';
import verifyAppointment from '@services/booking/verifyAppointment';
const bookingRouter = express.Router();

// Gets all booked appointment dates
bookingRouter.get('/', async (req, res) => {

    const bookedDates = await getAppointments();

    res.json(bookedDates);
});

// Verifies appointment by removing token and changing status
bookingRouter.get('/verify', async (req, res) => {
    const token: string = req.query.token as string;
    if (!token) {
        res.status(400).send('Missing token');
        return
    }

    const appointmentVerified = await verifyAppointment(token);
    if (!appointmentVerified.success) {
        res.status(400).send(appointmentVerified.message);
        return
    }

    res.status(200).send('Appointment verified successfully');
})

// Books an appointment
bookingRouter.post('/', async (req, res) => {
    const { customerName, customerPhone, customerEmail, service, date, note, hour, appointmentVerified } = req.body;

    // Here you would typically save the booking to a database
    const appointment = await bookAppointment(service, date, customerName, customerPhone, customerEmail, note, hour, appointmentVerified);

    if (appointment === "hour-already-booked" ) {
        res.status(200).json({ message: 'hour-already-booked' });
        return
    }
    if (appointment === "error-creating-appointment") {
        res.status(200).json({ message: 'error-creating-appointment' });
        return
    }if (appointment === "email-already-used") {
        res.status(200).json({ message: 'email-already-used' });
        return
    }

    res.status(200).json({ message: 'Booking successful' });
});

// Gets available hours for specific date
bookingRouter.put('/available-hours', async (req, res) => {

    // Ex. format: 2023-10-01
    const { date, bookedHours } = req.body;
    const availableHours = await getAvailableHours(date, bookedHours);

    res.json(availableHours);
});

export default bookingRouter;