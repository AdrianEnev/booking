import fetchAppointments from "../get/useFetchAppointments";

const postAppointment = async (
    customerName: string,
    customerPhone: string,
    customerEmail: string,
    service: string,
    date: string,
    hour: string,
    note: string,
    setLoading: (loading: boolean) => void,
    navigate: (path: string) => void,
    isAdmin: boolean
) => {

    // If admin is booking the appointment manually, automatically verify the appointment
    let appointmentVerified = false;
    if (isAdmin) {
        appointmentVerified = true;
    }
    
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
                note: note,
                appointmentVerified: appointmentVerified
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
        if (data.message == "hour-already-booked") {
            if (isAdmin) {
                alert("Този час вече е зает!");
                navigate(`/admin/dashboard`);
                return;
            }
            navigate(`/booking`)
            alert(`Този час бе зает от някой друг, току що! (${hour})`);
            return;
        }
        if (data.message == "email-already-used") {
            if (isAdmin) {
                alert("Този имейл вече е използван!");
                return;
            }
            navigate(`/`)
            alert("Вече имаш запазен час!");
            return;
        }
        if (data.message == "error-creating-appointment") {
            if (isAdmin) {
                alert("Възникна грешка!");
                navigate(`/admin/dashboard`);
                return;
            }
            navigate(`/`)
            alert("Грешка! Опитай отново по-късно!");
            return;
        }

        alert("Записването е успешно!");

        if (isAdmin) {
            navigate('/admin/dashboard');
            return
        }

        navigate('/');

    } catch (error) {
        console.error("Error booking appointment:", error);
        setLoading(false);
        return null;
    }

}

export default postAppointment