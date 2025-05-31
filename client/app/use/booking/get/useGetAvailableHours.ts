// Gets available hours for a specific date
const getAvailableHours = async (date: Date, bookedHours: string[]) => {

    //console.log('Retreiving available hours');
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = offsetDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/booking/available-hours`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Specifies the request body is JSON
            },
            body: JSON.stringify({
                date: formattedDate,
                bookedHours: bookedHours,
            }),
        });
        if (!response.ok) {
            console.error("Response ERROR retreiving available hours:", response);
            return null;
        }

        const data = await response.json();
        //console.log("Available hours:", data);
        return data; 

    } catch (error) {
        console.error("ERROR retreiving available hours:", error);
        return null;
    }

}

export default getAvailableHours;