import { FIRESTORE_ADMIN } from "@config/firebaseConfig";
import { Timestamp } from "firebase-admin/firestore";

const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
};

const getAvailableHours = async (date: string | Date, bookedHours: string[]) => {

    // bookedHours retreived on frontend since it is easily accessible from the already-fetched appointments

    let availableHours: string[] = [
        "15:00", "15:30", "16:00", 
        "16:30", "17:00", "17:30", 
        "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00",
    ];

    // If weekend => work day ends at 7 o clock
    if (isWeekend(typeof date === "string" ? new Date(date) : date)) {
        availableHours = availableHours.filter(hour => hour <= "19:00");
    }

    // If the input is a string, validate and parse it
    if (typeof date === "string") {
        // Check if the string is in ISO 8601 format or YYYY-MM-DD
        const isISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(date);
        const isValidDateString = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date);

        if (!isISO8601 && !isValidDateString) {
            throw new Error("Invalid date format. Expected format: YYYY-MM-DD or ISO 8601");
        }

        // Convert the valid date string to a Date object
        date = new Date(date);
    }

    // Validate the Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error("Invalid Date object provided");
    }

    // Clone the date to ensure immutability
    const clonedDate = new Date(date.getTime());

    // Convert UTC date to server's date (UTC+3)
    const serverDateUTC = new Date(clonedDate.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours

    // Convert serverDateUTC to Firestore Timestamp
    const serverDateTimestamp = Timestamp.fromDate(serverDateUTC);

    const appointments = await FIRESTORE_ADMIN
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
};

export default getAvailableHours;