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
const express_1 = __importDefault(require("express"));
const bookAppointment_1 = __importDefault(require("@services/booking/bookAppointment"));
const getAppointments_1 = __importDefault(require("@services/booking/getAppointments"));
const getAvailableHours_1 = __importDefault(require("@services/booking/getAvailableHours"));
const verifyAppointment_1 = __importDefault(require("@services/booking/verifyAppointment"));
const bookingRouter = express_1.default.Router();
// Gets all booked appointment dates
bookingRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedDates = yield (0, getAppointments_1.default)();
    res.json(bookedDates);
}));
// Verifies appointment by removing token and changing status
bookingRouter.get('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    if (!token) {
        res.status(400).send('Missing token');
        return;
    }
    const appointmentVerified = yield (0, verifyAppointment_1.default)(token);
    if (!appointmentVerified.success) {
        res.status(400).send(appointmentVerified.message);
        return;
    }
    res.status(200).send('Appointment verified successfully');
}));
// Books an appointment
bookingRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerName, customerPhone, customerEmail, service, date, note, hour, appointmentVerified } = req.body;
    // Here you would typically save the booking to a database
    const appointment = yield (0, bookAppointment_1.default)(service, date, customerName, customerPhone, customerEmail, note, hour, appointmentVerified);
    if (appointment === "hour-already-booked") {
        res.status(200).json({ message: 'hour-already-booked' });
        return;
    }
    if (appointment === "error-creating-appointment") {
        res.status(200).json({ message: 'error-creating-appointment' });
        return;
    }
    if (appointment === "email-already-used") {
        res.status(200).json({ message: 'email-already-used' });
        return;
    }
    res.status(200).json({ message: 'Booking successful' });
}));
// Gets available hours for specific date
bookingRouter.put('/available-hours', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Ex. format: 2023-10-01
    const { date, bookedHours } = req.body;
    const availableHours = yield (0, getAvailableHours_1.default)(date, bookedHours);
    res.json(availableHours);
}));
exports.default = bookingRouter;
