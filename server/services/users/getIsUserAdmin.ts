import { FIREBASE_ADMIN } from "@config/firebaseConfig";

// Check if the user is an admin
const getIsUserAdmin = async (userId: string): Promise<boolean> => {
    try {
        const userRecord = await FIREBASE_ADMIN.auth().getUser(userId);
        const claims = userRecord.customClaims || {};
        return claims.isAdmin === true;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return false;
    }
}

export default getIsUserAdmin;