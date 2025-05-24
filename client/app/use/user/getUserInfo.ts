const getUserInfo = async (user: any) => {

    // not implemented on backend
    
    const userId = user.uid;

    try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            console.error("Response error:", response);
            return null;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }

}

export default getUserInfo;