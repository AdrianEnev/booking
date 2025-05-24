import React from 'react';
import AppointmentItem from './AppointmentItem';

export default function AppointmentsComponent(
    { appointments, setAppointments, getAppointments, setLoading, retreivingAppointments }: any
) {
    return (
        <div className="flex flex-col gap-y-6 mt-4 border border-gray-200 rounded-xl px-4 pt-4 pb-2">

            <div className="grid grid-cols-7 text-center text-xl font-bold">
                <p>Дата</p>
                <p>Имейл</p>
                <p>Име</p>
                <p>Телефон</p>
                <p>Бележка</p>
                <p>Услуга</p>
                <p>Час</p>
            </div>

            {/* Scrollable Appointments Container */}
            <div className="overflow-y-auto max-h-128 flex flex-col gap-y-3 border border-gray-200 rounded-xl py-4">
                
                {appointments && appointments.length === 0 && !retreivingAppointments ? 
                (
                    <div className="w-full h-full z-20 flex justify-center items-center">
                        <p className="text-gray-500 text-lg">Няма намерени часове</p>
                    </div>
                ) : 
                    appointments && appointments.length === 0 && retreivingAppointments ?
                (
                    <div className="w-full h-full z-20 flex justify-center items-center">
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
                        </div>
                    </div>
                ) :
                    appointments.map((appointment: any) => (
                        <AppointmentItem key={appointment.id} appointment={appointment} />
                    )
                )}
            </div>

            <div className='w-full h-12'>
                <button className='flex flex-row gap-x-2'>
                    <p className='text-gray-500 text-sm mt-[-2px] mb-[2px]'>Днес</p>
                    <input 
                        type="checkbox" 
                        className='w-4 h-4 border border-gray-300 rounded-lg' 
                        onChange={async (e) => {
                            const isChecked = e.target.checked;

                            // If unchecked => display all appointments
                            if (!isChecked) {
                                setLoading(true)
                                await getAppointments();
                                setLoading(false)
                                return
                            }

                            
                            // If checked => display today's appointments
                            const today = new Date();
                            const todayAppointments = appointments.filter((appointment: any) => {
                                const appointmentDate = new Date(appointment.appointmentDate);
                                return (
                                    appointmentDate.getDate() === today.getDate() &&
                                    appointmentDate.getMonth() === today.getMonth() &&
                                    appointmentDate.getFullYear() === today.getFullYear()
                                );
                            });
                            setAppointments(todayAppointments);
                        }}
                    />
                </button>
                
                <p className='text-gray-500 text-sm'>Общо: {appointments.length} поръчки</p>
            </div>
        </div>
    );
}