import { FIREBASE_AUTH } from "@config/firebaseConfig";

const getIsUserAdmin = async () => {

    const userId = FIREBASE_AUTH.currentUser?.uid;
    if (!userId) {
        return false;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}/admin`, {
            method: 'GET',
        });
        if (!response.ok) {
            console.error("RESPONSE ERROR checking if user is admin:", response);
            return null;
        }

        const data = await response.json();
        if (!data.isAdmin) {
            return false;
        }

        return true;
    } catch (error) {
        console.error("ERROR checking if user is admin:", error);
        return null;
    }
}

export default getIsUserAdmin;