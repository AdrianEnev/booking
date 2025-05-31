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
// Gets all booked appointments
const getAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentsCollectionRef = yield firebaseConfig_1.FIRESTORE_ADMIN
            .collection('appointments')
            .get();
        if (appointmentsCollectionRef.empty) {
            console.log('No appointments found');
            return [];
        }
        const appointments = [];
        appointmentsCollectionRef.forEach((doc) => {
            const appointmentData = doc.data();
            appointments.push({
                id: doc.id,
                appointmentDate: appointmentData.appointmentDate.toDate(),
                hour: appointmentData.hour,
                customerEmail: appointmentData.customerEmail,
                customerName: appointmentData.customerName,
                customerPhone: appointmentData.customerPhone,
                note: appointmentData.note,
                service: appointmentData.service,
                status: appointmentData.status,
            });
        });
        //console.log('Appointments:', appointments);
        return appointments;
    }
    catch (err) {
        throw new InternalError_1.default('Error fetching appointments, ' + err);
    }
});
exports.default = getAppointments;
