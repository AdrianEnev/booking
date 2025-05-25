import { validateCredentials } from "~/use/credentials/useValidateCredentials";
import postAppointment from "./usePostAppointment";

const bookAppointment = async (
    loading: boolean,
    setLoading: (loading: boolean) => void,
    service: string,
    date: string,
    hour: string,
    customerName: string,
    customerPhone: string,
    customerEmail: string,
    note: string,
    navigate: any,
    isAdmin: boolean
) => {

    if (loading) return;
    if (!service || !date || !hour) return;

    // Validate credentials
    if (!customerName || !customerPhone || !customerEmail) {
        return;
    }

    if (await validateCredentials(customerEmail, customerPhone, customerName) == false) {
        return;
    }

    setLoading(true);
    await postAppointment(
        customerName,
        customerPhone,
        customerEmail,
        service,
        date,
        hour,
        note,
        setLoading,
        navigate,
        isAdmin
    )
    setLoading(false);
}

export default bookAppointment;