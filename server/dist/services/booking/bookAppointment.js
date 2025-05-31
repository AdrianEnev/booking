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
const uuid_1 = require("uuid"); // For generating unique tokens
// Checks if the date exists in the database already
// Can prevent 2 users from booking at the same date
const checkHourTaken = (date, hour) => __awaiter(void 0, void 0, void 0, function* () {
    const selectedDate = new Date(date);
    // Set 3 hours ahead, since firebase stores the dates in a different timezone
    const formattedDate = selectedDate.setHours(3, 0, 0, 0);
    try {
        // Await the query to resolve
        const querySnapshot = yield firebaseConfig_1.FIRESTORE_ADMIN
            .collection('appointments')
            .where('appointmentDate', '==', formattedDate)
            .where('hour', '==', hour)
            .get();
        //console.log('querySnapshot:', querySnapshot);
        if (querySnapshot.empty) {
            console.log('No existing appointments found for the selected date');
            return false; // No conflicting appointments
        }
        else {
            console.log('Appointment already exists for the selected date and hour');
            return true; // Conflicting appointment found
        }
    }
    catch (error) {
        console.error('Error checking date:', error);
        throw new InternalError_1.default('Error checking date availability');
    }
});
const bookAppointment = (service, date, customerName, customerPhone, customerEmail, note, hour, appointmentVerified) => __awaiter(void 0, void 0, void 0, function* () {
    // Date format: YYYY-MM-DD
    try {
        const existingAppointment = yield firebaseConfig_1.FIRESTORE_ADMIN
            .collection('appointments')
            .where('customerEmail', '==', customerEmail)
            //.where('status', '==', 'confirmed') // Only check confirmed appointments
            .get();
        if (!existingAppointment.empty) {
            return 'email-already-used';
        }
        const isHourTaken = yield checkHourTaken(date, hour);
        if (isHourTaken) {
            return 'hour-already-booked';
        }
        // Generate a verification token
        const verificationToken = (0, uuid_1.v4)();
        const appointmentDate = new Date(date);
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
        yield firebaseConfig_1.FIRESTORE_ADMIN.collection('appointments').add(appointmentData);
        yield (0, sendAppointmentEmail_1.default)(customerEmail, verificationToken, appointmentVerified, service, appointmentDate, hour);
        return 'success';
    }
    catch (err) {
        console.error('Error creating appointment:', err);
        return 'error-creating-appointment';
    }
});
exports.default = bookAppointment;
