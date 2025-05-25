// Gets available hours for a specific date
const getAvailableHours = async (date: Date, bookedHours: string[]) => {

    //console.log('Retreiving available hours');

    try {
        const response = await fetch(`http://localhost:3000/api/booking/available-hours`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Specifies the request body is JSON
            },
            body: JSON.stringify({
                date: date,
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