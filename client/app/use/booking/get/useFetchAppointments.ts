const fetchAppointments = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/booking`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Specifies the request body is JSON
            },
        });
        if (!response.ok) {
            console.error("Response ERROR retreiving appointments:", response);
            return null;
        }

        const data = await response.json();
        //console.log("Appointments:", data);
        return data; 

    } catch (error) {
        console.error("ERROR retreiving appointments:", error);
        return null;
    }
}
export default fetchAppointments;