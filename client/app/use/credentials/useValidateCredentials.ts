export const validateCredentials = async (email: string, phone: string, name: string) => {

    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // check if phone is valid bulgarian number
    const phoneRegex = /^(?:\+359|0)(?:8[7-9])[0-9]{7}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number.");
        return false;
    }

    // check if name is valid
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    if (!nameRegex.test(name)) {
        alert("Please enter a valid name. (Example: Адриан Енев)");
        return false;
    }

}   