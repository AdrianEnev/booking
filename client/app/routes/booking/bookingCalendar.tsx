import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useGlobalContext } from '@config/GlobalContext';
import CustomCalendar from '~/components/booking/Calendar/CustomCalendar';
import handleCalendarDayClicked from '~/use/booking/handle/handleCalendarDayClicked';
import CustomCalendarHours from '~/components/booking/Calendar/CustomCalendarHours';
import { getBookedAppointmentsLocally } from '~/use/booking/get/getBookedAppointmentsLocally';
import CustomCalendarServices from '~/components/booking/Calendar/CustomCalendarServices';
import { useNavigate } from 'react-router';
import CustomCalendarCheckout from '~/components/booking/Calendar/CustomCalendarCheckout';

const bookingCalendar = () => {

    const navigate = useNavigate();
    const {loading, setLoading, isAdmin} = useGlobalContext();
    
    // prevents today's date from automatically being selected
    const [initialDateSelected, setInitialDateSelected] = useState(false);
    
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedHour, setSelectedHour] = useState<string>('');
    const [selectedService, setSelectedService] = useState<string>('');
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
    useEffect(() => {
        const fetch = async () => {
            const appointments = await getBookedAppointmentsLocally();
            setBookedAppointments(appointments);
        };

        fetch();
    }, []);

    useEffect(() => {
        if (!initialDateSelected) return;

        handleCalendarDayClicked(
            selectedDate,
            loading,
            setLoading,
            setAvailableHours,
            bookedAppointments
        )
    }, [selectedDate])

    /*useEffect(() => {
        // Checkout reached
    }, [selectedService])*/

    return (
        <div className={`w-full h-full font-manrope ${isAdmin ? 'px-10 pt-6' : 'px-[9%] pt-10'}`}>
            {!initialDateSelected ? (
                <CustomCalendar 
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    setInitialDateSelected={setInitialDateSelected} // Prevents today's date from automatically being selected
                    navigate={navigate}
                />
            ) : (initialDateSelected && !selectedHour) ? (
                <CustomCalendarHours
                    selectedDate={selectedDate}
                    setInitialDateSelected={setInitialDateSelected} // Used to navigate back to calendar
                    availableHours={availableHours}
                    setSelectedHour={setSelectedHour}
                />
            ) : !selectedService ? (
                <CustomCalendarServices
                    selectedDate={selectedDate}
                    selectedHour={selectedHour}
                    setSelectedHour={setSelectedHour}
                    setSelectedService={setSelectedService}
                />
            ) : (
                <CustomCalendarCheckout 
                    selectedDate={selectedDate}
                    selectedHour={selectedHour}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    loading={loading}
                    setLoading={setLoading}
                    navigate={navigate}
                    isAdmin={isAdmin}
                />
            )}
        </div>
    );
};

export default bookingCalendar;