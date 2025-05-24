import { FIRESTORE_ADMIN } from "@config/firebaseConfig";
import InternalError from "@custom_errors/InternalError";
import sendAppointmentEmail from "./sendAppointmentEmail";

const verifyAppointment = async (verificationToken: string) => {
    try {
        // Query the database for the document with the matching verificationToken
        const querySnapshot = await FIRESTORE_ADMIN
            .collection('appointments')
            .where('verificationToken', '==', verificationToken)
            .get();

        if (querySnapshot.empty) {
            console.log('No appointment found with the provided verification token.');
            return { success: false, message: 'Невалиден или изтекъл линк!' };
        }

        // Assuming verificationToken is unique, there should be only one document
        const appointmentDoc = querySnapshot.docs[0];
        const appointmentRef = appointmentDoc.ref;

        // Update the appointment status to 'confirmed' and remove the verificationToken
        await appointmentRef.update({
            status: 'confirmed',
            verificationToken: null, // Remove the token after verification
        });

        console.log('Appointment successfully verified and updated.');
        await sendConfirmationEmail(appointmentRef);
        
        return { success: true, message: 'Успешно потвърдихте часа си!' };
    } catch (error) {
        console.error('Error verifying appointment:', error);
        return { success: false, message: 'Възникна грешка!' };
    }
};

const sendConfirmationEmail = async (appointmentRef: any) => {
    try {
        // Fetch the document snapshot
        const appointmentSnapshot = await appointmentRef.get();

        // Check if the document exists
        if (!appointmentSnapshot.exists) {
            throw new InternalError('Appointment document does not exist.');
        }

        // Retrieve the document data
        const appointmentData = appointmentSnapshot.data();
        const customerEmail = appointmentData.customerEmail;
        const hour = appointmentData.hour;
        const service = appointmentData.service;
        const appointmentDate = new Date(appointmentData.appointmentDate);

        // Send the confirmation email
        await sendAppointmentEmail(
            customerEmail, null, true,
            service, appointmentDate, hour
        );
    } catch (err) {
        throw new InternalError('Failed to send confirmation email: ' + err);
    }
};

export default verifyAppointment;