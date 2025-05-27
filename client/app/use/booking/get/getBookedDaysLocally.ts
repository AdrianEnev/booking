const getBookedDaysLocally = async () => {
    const bookedAppointments = localStorage.getItem('bookedDays');
    if (bookedAppointments) {
        return JSON.parse(bookedAppointments)
    } else {
        return [];
    }
}

export default getBookedDaysLocally;