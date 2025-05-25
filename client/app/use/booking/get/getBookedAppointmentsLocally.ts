export const getBookedAppointmentsLocally = async () => {
    const bookedAppointments = localStorage.getItem('bookedAppointments');
    if (bookedAppointments) {
        //console.log('Retreived booked appointments locally');
        return JSON.parse(bookedAppointments)
    } else {
        //console.log('No booked appointments found locally')
        return [];
    }
}