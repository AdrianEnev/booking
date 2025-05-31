import { FIREBASE_AUTH } from "@config/firebaseConfig";

const setCurrentUserAdmin = async (isAdmin: boolean) => {

    console.log('setting current user isAdmin to', isAdmin)

    const userId = FIREBASE_AUTH.currentUser?.uid;

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}/admin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Specifies the request body is JSON
            },
            body: JSON.stringify({
                isAdmin: isAdmin
            }),
        });
        if (!response.ok) {
            console.error("RESPONSE ERROR changing user isAdmin:", response);
            return null;
        }

        console.log('successfully set current user isAdmin to', isAdmin)
    } catch (error) {
        console.error("ERROR changing user isAdmin:", error);
        return null;
    }

}

export default setCurrentUserAdmin;