import { FIREBASE_ADMIN } from "@config/firebaseConfig";

// Change user "isAdmin" custom claims in firebase
const setUserAdmin = async (userId: string, isAdmin: boolean) => {
    FIREBASE_ADMIN.auth().setCustomUserClaims(userId, { isAdmin: isAdmin })
    .then(() => {
        console.log("Custom claims set for user");
    });
}

export default setUserAdmin;