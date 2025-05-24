import { useGlobalContext } from '@config/GlobalContext';
import React, { useEffect, useState } from 'react'
import AppointmentsComponent from '~/components/admin/AppointmentsComponent';
import fetchAppointments from '~/use/booking/useFetchAppointments';

// Function to sort appointments by hour and date, newest ones show at the top
function sortAppointments(appointments: any[]) {
    return [...appointments].sort((a: any, b: any) => {
        const today = new Date();
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);

        // Check if the appointment date matches today's date
        const isTodayA = dateA.toDateString() === today.toDateString();
        const isTodayB = dateB.toDateString() === today.toDateString();

        // Prioritize appointments that are today
        if (isTodayA && !isTodayB) return -1;
        if (!isTodayA && isTodayB) return 1;

        // Primary sort: Closest date to today
        const dateDifference = Math.abs(dateA.getTime() - today.getTime()) - Math.abs(dateB.getTime() - today.getTime());
        if (dateDifference !== 0) {
            return dateDifference;
        }

        // Secondary sort: Descending order of "hour"
        const timeA = a.hour.split(':').map(Number); // Convert "hour" to [hours, minutes]
        const timeB = b.hour.split(':').map(Number);
        const totalMinutesA = timeA[0] * 60 + timeA[1]; // Convert to total minutes
        const totalMinutesB = timeB[0] * 60 + timeB[1];
        return totalMinutesB - totalMinutesA; // Descending order
    });
}

export default function dashboard() {

    // retreivingAppointments is used to distinguish between loading and empty state
    const {setLoading, retrievingAppointments, setRetrievingAppointments} = useGlobalContext();
    const [appointments, setAppointments] = useState<any[]>([])
    useEffect(() => {
        getAppointments();
    }, [])

    const getAppointments = async () => {
        setRetrievingAppointments(true)
        const appointments = await fetchAppointments();
        const confirmedAppointments = appointments.filter((appointment: any) => appointment.status === "confirmed");
        setAppointments(confirmedAppointments);
        setRetrievingAppointments(false);
    }

    return (
        <div className="w-full h-full font-manrope px-12">

            <p className="text-3xl text-black mt-5 font-semibold">
                Дашборд
            </p>
            <div className='w-full h-[2px] bg-gray-100 rounded-full mt-2'></div>
            

            <h1 className='text-xl font-semibold mt-2'>Поръчки</h1>
            <AppointmentsComponent 
                appointments={sortAppointments(appointments)} 
                setAppointments={setAppointments} 
                getAppointments={getAppointments}
                setLoading={setLoading}
                retrievingAppointments={retrievingAppointments}
            />

            <div className='w-full h-32 mt-3'></div>

        </div>
    )
}
