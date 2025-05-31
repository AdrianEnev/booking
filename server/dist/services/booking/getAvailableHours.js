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
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseConfig_1 = require("@config/firebaseConfig");
const firestore_1 = require("firebase-admin/firestore");
const isWeekend = (date) => {
    const day = date.getDay();
    if (day === 0 || day === 6) {
        console.log(`${date.toISOString()} is a weekend`);
    }
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
};
const getAvailableHours = (date, bookedHours) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the input date string (YYYY-MM-DD format)
    const isValidDateString = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date);
    if (!isValidDateString) {
        throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
    }
    // Convert the valid date string to a Date object
    const parsedDate = new Date(date);
    // Validate the Date object
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid Date object provided");
    }
    // All possible working hours
    let availableHours = [
        "15:00", "15:30", "16:00",
        "16:30", "17:00", "17:30",
        "18:00", "18:30", "19:00",
        "19:30", "20:00", "20:30",
    ];
    // If weekend => work day ends at 7 o'clock
    if (isWeekend(parsedDate)) {
        availableHours = availableHours.filter(hour => hour <= "19:00");
    }
    // Convert UTC date to server's date (UTC+3)
    const serverDateUTC = new Date(parsedDate.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours
    // Convert serverDateUTC to Firestore Timestamp
    const serverDateTimestamp = firestore_1.Timestamp.fromDate(serverDateUTC);
    const appointments = yield firebaseConfig_1.FIRESTORE_ADMIN
        .collection("appointments")
        .where("appointmentDate", "==", serverDateTimestamp)
        .select("hour") // Fetch only the "hour" field
        .get();
    if (appointments.empty && bookedHours.length === 0) {
        console.log('No appointment for this day, all hours available');
        return availableHours;
    }
    // Remove all bookedHours from availableHours, then return whatever is left
    const filteredAvailableHours = availableHours.filter((hour) => !bookedHours.includes(hour));
    console.log(`Available hours for ${serverDateUTC.toISOString().split('T')[0]}:`, filteredAvailableHours);
    return filteredAvailableHours;
});
exports.default = getAvailableHours;
