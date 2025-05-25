import { FIRESTORE_ADMIN } from "@config/firebaseConfig";
import InternalError from "@custom_errors/InternalError";
import sendAppointmentEmail from "./sendAppointmentEmail";
import { v4 as uuidv4 } from 'uuid'; // For generating unique tokens

// Checks if the date exists in the database already
// Can prevent 2 users from booking at the same date
const checkHourTaken = async (date: string, hour: string) => {

    //console.log('checking if hour is taken:', date);

    const selectedDate = new Date(date);
    //console.log('converted date:', selectedDate);

    const formattedDate = selectedDate.setHours(3, 0, 0, 0);

    try {
        // Await the query to resolve
        const querySnapshot = await FIRESTORE_ADMIN
            .collection('appointments')
            .where('appointmentDate', '==', formattedDate)
            .where('hour', '==', hour)
            .get();

        //console.log('querySnapshot:', querySnapshot);

        if (querySnapshot.empty) {
            console.log('No existing appointments found for the selected date');
            return false; // No conflicting appointments
        } else {
            console.log('Appointment already exists for the selected date and hour');
            return true; // Conflicting appointment found
        }
    } catch (error) {
        console.error('Error checking date:', error);
        throw new InternalError('Error checking date availability');
    }
}

const bookAppointment = async (
    service: string, date: string, customerName: string, 
    customerPhone: string, customerEmail: string,
    note: string, hour: string, appointmentVerified: boolean
) => {

    try {
        const existingAppointment = await FIRESTORE_ADMIN
            .collection('appointments')
            .where('customerEmail', '==', customerEmail)
            .where('status', '==', 'confirmed') // Only check confirmed appointments
            .get();

        if (!existingAppointment.empty) {
            return 'email-already-used';
        }

        const isHourTaken = await checkHourTaken(date, hour);
        if (isHourTaken) {
            return 'hour-already-booked'
        }

        // Generate a verification token
        const verificationToken = uuidv4();
        const appointmentDate = new Date(date)

        const appointmentData = {
            customerName: customerName,
            customerPhone: customerPhone,
            customerEmail: customerEmail,
            service: service,
            appointmentDate: appointmentDate,
            hour: hour, 
            note: note,
            created: new Date(),
            status: appointmentVerified ? 'confirmed' : 'pending',
            verificationToken: appointmentVerified ? null : verificationToken,
        };

        await FIRESTORE_ADMIN.collection('appointments').add(appointmentData)
        await sendAppointmentEmail(
            customerEmail, verificationToken, appointmentVerified,
            service, appointmentDate, hour
        );
        return 'success'
    }catch (err: any){
        console.error('Error creating appointment:', err);
        return 'error-creating-appointment';
    }
}

export default bookAppointment;