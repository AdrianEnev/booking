const getUserInfo = async (user: any) => {

    // not implemented on backend
    
    const userId = user.uid;

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
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