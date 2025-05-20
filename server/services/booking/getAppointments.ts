import { FIRESTORE_ADMIN } from "@config/firebaseConfig";
import InternalError from "@custom_errors/InternalError";

// Gets all booked appointments
const getAppointments = async () => {

    try {
        const appointmentsCollectionRef = await FIRESTORE_ADMIN
            .collection('appointments')
            .get()

        if (appointmentsCollectionRef.empty) {
            console.log('No appointments found');
            return [];
        }

        const appointments: any[] = [];
        appointmentsCollectionRef.forEach((doc) => {
            const appointmentData = doc.data();
            appointments.push({
                id: doc.id,
                appointmentDate: appointmentData.appointmentDate.toDate(),
                hour: appointmentData.hour,
            });
        });

        //console.log('Appointments:', appointments);
        return appointments;

    }catch (err: any) {
        throw new InternalError('Error fetching appointments, ' + err);
    }
   
}
export default getAppointments;