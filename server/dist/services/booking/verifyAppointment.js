"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseConfig_1 = require("@config/firebaseConfig");
const InternalError_1 = __importDefault(require("@custom_errors/InternalError"));
const sendAppointmentEmail_1 = __importDefault(require("./sendAppointmentEmail"));
const verifyAppointment = (verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the database for the document with the matching verificationToken
        const querySnapshot = yield firebaseConfig_1.FIRESTORE_ADMIN
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
        yield appointmentRef.update({
            status: 'confirmed',
            verificationToken: null, // Remove the token after verification
        });
        console.log('Appointment successfully verified and updated.');
        yield sendConfirmationEmail(appointmentRef);
        return { success: true, message: 'Успешно потвърдихте часа си!' };
    }
    catch (error) {
        console.error('Error verifying appointment:', error);
        return { success: false, message: 'Възникна грешка!' };
    }
});
const sendConfirmationEmail = (appointmentRef) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the document snapshot
        const appointmentSnapshot = yield appointmentRef.get();
        // Check if the document exists
        if (!appointmentSnapshot.exists) {
            throw new InternalError_1.default('Appointment document does not exist.');
        }
        // Retrieve the document data
        const appointmentData = appointmentSnapshot.data();
        const customerEmail = appointmentData.customerEmail;
        const hour = appointmentData.hour;
        const service = appointmentData.service;
        const appointmentDate = new Date(appointmentData.appointmentDate);
        // Send the confirmation email
        yield (0, sendAppointmentEmail_1.default)(customerEmail, null, true, service, appointmentDate, hour);
    }
    catch (err) {
        throw new InternalError_1.default('Failed to send confirmation email: ' + err);
    }
});
exports.default = verifyAppointment;
