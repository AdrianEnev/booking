import fetchAppointments from "./useFetchAppointments";

const postAppointment = async (
    customerName: string,
    customerPhone: string,
    customerEmail: string,
    service: string,
    date: string,
    hour: string,
    note: string,
    setLoading: (loading: boolean) => void,
    navigate: (path: string) => void
) => {

    try {
        const response = await fetch(`http://localhost:3000/api/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specifies the request body is JSON
            },
            body: JSON.stringify({
                customerName: customerName,
                customerPhone: customerPhone,
                customerEmail: customerEmail,
                service: service,
                date: date,
                hour: hour,
                note: note
            }),
        });
        if (!response.ok) {
            console.error("Response error booking appointment:", response);
            setLoading(false);
            return null;
        }

        // Re-fetch appointments so the newly-added hour is removed from the list
        const bookedAppointments = await fetchAppointments();
        if (bookedAppointments) {
            localStorage.setItem("bookedAppointments", JSON.stringify(bookedAppointments));
        }

        const data = await response.json();
        if (data.message == "hour-already-booked"){
            navigate(`/booking`)
            alert(`${hour} has just been taken by someone else!`);
            return;
        }

        alert("Записването е успешно!");
        navigate('/');

    } catch (error) {
        console.error("Error booking appointment:", error);
        setLoading(false);
        return null;
    }

}

export default postAppointment