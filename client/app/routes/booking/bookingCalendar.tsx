import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@config/GlobalContext';
import CustomCalendar from '@components/booking/Calendar/CustomCalendar';
import handleCalendarDayClicked from '~/use/booking/handle/handleCalendarDayClicked';
import CustomCalendarHours from '@components/booking/Calendar/CustomCalendarHours';
import { getBookedAppointmentsLocally } from '~/use/booking/get/getBookedAppointmentsLocally';
import CustomCalendarServices from '@components/booking/Calendar/CustomCalendarServices';
import { useNavigate } from 'react-router';
import CustomCalendarCheckout from '@components/booking/Calendar/CustomCalendarCheckout';
import getBookedDaysLocally from '~/use/booking/get/getBookedDaysLocally';
import getDimensions from '@use/getDimensions';
import { motion } from 'framer-motion';

const bookingCalendar = () => {

    const navigate = useNavigate();
    const {loading, setLoading, isAdmin} = useGlobalContext();
    
    // prevents today's date from automatically being selected
    const [initialDateSelected, setInitialDateSelected] = useState(false);

    const [customCalendarHoursAnimationRan, setCustomCalendarHoursAnimationRan] = useState(false);
    const [customCalendarServicesAnimationRan, setCustomCalendarServicesAnimationRan] = useState(false);
    const [customCalendarCheckoutAnimationRan, setCustomCalendarCheckoutAnimationRan] = useState(false);
    
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedHour, setSelectedHour] = useState<string>('');
    const [selectedService, setSelectedService] = useState<string>('');
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
    const [bookedDays, setBookedDays] = useState<string[]>([]);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });
    const fetchDimensions = async () => {
        const result = await getDimensions();
        setDimensions(result);
    }

    useEffect(() => {
        const handleResize = () => {
            fetchDimensions();
        };

        window.addEventListener("resize", handleResize);
        fetchDimensions(); // Initial fetch on mount

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const bookedAppointments = await getBookedAppointmentsLocally();
            setBookedAppointments(bookedAppointments);

            const bookedDays = await getBookedDaysLocally()
            setBookedDays(bookedDays);
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

    return (
        <motion.div className={`w-full h-full font-manrope ${isAdmin ? 'px-10 pt-6' : 'px-[4%] md:px-[9%] pt-10'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {!initialDateSelected ? (
                <CustomCalendar 
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    setInitialDateSelected={setInitialDateSelected} // Prevents today's date from automatically being selected
                    navigate={navigate}
                    bookedDays={bookedDays}
                />
            ) : (initialDateSelected && !selectedHour) ? (
                <CustomCalendarHours
                    selectedDate={selectedDate}
                    setInitialDateSelected={setInitialDateSelected} // Used to navigate back to calendar
                    availableHours={availableHours}
                    setSelectedHour={setSelectedHour}
                    customCalendarHoursAnimationRan={customCalendarHoursAnimationRan}
                    setCustomCalendarHoursAnimationRan={setCustomCalendarHoursAnimationRan}
                />
            ) : !selectedService ? (
                <CustomCalendarServices
                    selectedDate={selectedDate}
                    selectedHour={selectedHour}
                    setSelectedHour={setSelectedHour}
                    setSelectedService={setSelectedService}
                    dimensions={dimensions}
                    customCalendarServicesAnimationRan={customCalendarServicesAnimationRan}
                    setCustomCalendarServicesAnimationRan={setCustomCalendarServicesAnimationRan}
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
                    customCalendarCheckoutAnimationRan={customCalendarCheckoutAnimationRan}
                    setCustomCalendarCheckoutAnimationRan={setCustomCalendarCheckoutAnimationRan}
                />
            )}
        </motion.div>
    );
};

export default bookingCalendar;