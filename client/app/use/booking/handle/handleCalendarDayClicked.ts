import getAvailableHours from "../get/useGetAvailableHours";

const handleCalendarDayClicked = async (
    date: Date,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    setAvailableHours: any,
    bookedAppointments: any
) => {

    if (loading) return;
    if (bookedAppointments.length === 0) {
        setAvailableHours([
            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', "19:00",
            '19:30', '20:00', '20:30', '21:00', '21:30'
        ])
        return;
    }

    setLoading(true);
    await getClickedDateAvailableHours(date, setAvailableHours, bookedAppointments)
    setLoading(false);
}

// Gets all availablehours for a given date
// does not run if a date is fully booked as css prevents it
const getClickedDateAvailableHours = async (value: Date, setAvailableHours: any, bookedAppointments: any) => {

    const isBooked = isDateFullyBooked(value, bookedAppointments);

    if (!isBooked) {
        const bookedHours = await matchDates(value, bookedAppointments);
        const availableHours = await getAvailableHours(value, bookedHours);
        setAvailableHours(availableHours);
    } else {
        console.log('Date is fully booked');
        setAvailableHours([]);
    }

};

const isDateFullyBooked = (date: Date, bookedAppointments: any) => {
    const normalizedDate = normalizeToMidnight(date);
    const appointmentsForDate = bookedAppointments.filter(
        (appointment: any) => isSameDay(new Date(appointment.appointmentDate), normalizedDate)
    );

    if (isWeekend(normalizedDate)) {
        return appointmentsForDate.length === 8; // Fully booked for weekends
    } else {
        return appointmentsForDate.length === 12; // Fully booked for weekdays
    }
};

// Searches through all bookedAppointments for the selected date and gathers all "hour" values into a list
const matchDates = async (selectedDate: Date, bookedAppointments: any) => {
    const normalizedDate = normalizeToMidnight(selectedDate);
    const bookedHours: string[] = [];

    bookedAppointments.forEach((appointment: any) => {
        if (isSameDay(new Date(appointment.appointmentDate), normalizedDate)) {
            bookedHours.push(appointment.hour);
            //console.log(bookedHours)
        }
    });

    return bookedHours;
};

function isSameDay(date1: Date, date2: Date) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
const normalizeToMidnight = (date: Date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(23, 59, 59, 999);
    return normalizedDate;
};
const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
};



/*const handleNavigation = (hour: string) => {
    if (loading) return;
    setLoading(true);

    const normalizedSelectedDate = normalizeToMidnight(selectedDate);
    const isBooked = isDateFullyBooked(selectedDate);

    if (!isBooked) {
        setLoading(false);
        navigate(`/booking/services/${normalizedSelectedDate.toISOString().split('T')[0]}/${hour}`);
    }
};*/

export default handleCalendarDayClicked;