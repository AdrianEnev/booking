import { standardizeDate } from "~/use/credentials/useStandardizeDate";
import { standardizeService } from "~/use/credentials/useStandardizeService";

function AppointmentItem({ appointment }: { appointment: any }) {

    /*const isAppointmentToday = () => {
        const today = new Date();
        const appointmentDate = new Date(appointment.appointmentDate);
        return (
            appointmentDate.getFullYear() === today.getFullYear() &&
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getDate() === today.getDate()
        );
    }*/

    //${isAppointmentToday() ? 'bg-yellow-200' : ''}

    return (
        <div className={`grid grid-cols-7 text-center`}>
            <p>{standardizeDate(appointment.appointmentDate)}</p>
            <p>{appointment.customerEmail || "-"}</p>
            <p>{appointment.customerName || "-"}</p>
            <p>{appointment.customerPhone || "-"}</p>
            <p>{appointment.note || "-"}</p>
            <p>{standardizeService(appointment.service) || "-"}</p>
            <p>{appointment.hour || "-"}</p>
        </div>
    );
}

export default AppointmentItem;