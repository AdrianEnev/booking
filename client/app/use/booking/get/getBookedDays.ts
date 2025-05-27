// Takes in all booked appointments and returns the dates which have all 12 appointments booked
const getBookedDays = async (bookedApppintments: any) => {

    let bookedDays = [];
    let appointmentDates = bookedApppintments.map((appointment: any) => {
        return new Date(appointment.appointmentDate).toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
    })

    // Count occurrences of each date
    const dateCounts: { [key: string]: number } = {};
    appointmentDates.forEach((date: string) => {
        dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    // Check for dates with 12 appointments (12 appointments in an 8 hour work day)
    for (const date in dateCounts) {
        if (dateCounts[date] === 12) {
            bookedDays.push(date);
            console.log(`Date ${date} has 12 appointments booked.`);
        }
    }

    if (bookedDays && bookedDays.length > 0) {
        return bookedDays
    }

    return []
}

export default getBookedDays