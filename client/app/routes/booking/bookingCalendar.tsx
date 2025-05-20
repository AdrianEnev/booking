import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate, useParams } from 'react-router';
import getAvailableHours from '~/use/booking/useGetAvailableHours';
import 'react-calendar/dist/Calendar.css';
import { useGlobalContext } from '@config/GlobalContext';
import { standardizeDate } from '~/use/credentials/useStandardizeDate';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
  
function isSameDay(date1: Date, date2: Date) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

const normalizeToMidnight = (date: Date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(23, 59, 59, 999);
    return normalizedDate;
};

const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
};

const bookingCalendar = () => {

    const navigate = useNavigate();

    const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
    const [value, onChange] = useState<Value>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    
    const {loading, setLoading} = useGlobalContext();

    const getBookedAppointmentsLocally = async () => {
        const bookedAppointments = localStorage.getItem('bookedAppointments');
        if (bookedAppointments) {
            //console.log('Retreived booked appointments locally');
            return JSON.parse(bookedAppointments)
        } else {
            //console.log('No booked appointments found locally')
            return [];
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const appointments = await getBookedAppointmentsLocally();
            setBookedAppointments(appointments);
        };

        fetch();
    }, []);

    const isDateFullyBooked = (date: Date) => {
        const normalizedDate = normalizeToMidnight(date);
        const appointmentsForDate = bookedAppointments.filter(
            (appointment) => isSameDay(new Date(appointment.appointmentDate), normalizedDate)
        );

        if (isWeekend(normalizedDate)) {
            return appointmentsForDate.length === 8; // Fully booked for weekends
        } else {
            return appointmentsForDate.length === 12; // Fully booked for weekdays
        }
    };

    // Searches through all bookedAppointments for the selected date and gathers all "hour" values into a list
    const matchDates = async (selectedDate: Date) => {
        const normalizedDate = normalizeToMidnight(selectedDate);
        const bookedHours: string[] = [];

        bookedAppointments.forEach((appointment) => {
            if (isSameDay(new Date(appointment.appointmentDate), normalizedDate)) {
                bookedHours.push(appointment.hour);
                //console.log(bookedHours)
            }
        });

        return bookedHours;
    };

    const handleNavigation = (hour: string) => {
        if (loading) return;
        setLoading(true);

        const normalizedSelectedDate = normalizeToMidnight(selectedDate);
        const isBooked = isDateFullyBooked(selectedDate);

        if (!isBooked) {
            setLoading(false);
            navigate(`/booking/services/${normalizedSelectedDate.toISOString().split('T')[0]}/${hour}`);
        }
    };

    // does not run if a date is fully booked as css prevents it
    const handleDayClicked = async (value: Date) => {

        if (loading) return;
        setLoading(true);
    
        const isBooked = isDateFullyBooked(value);
    
        if (!isBooked) {
            const bookedHours = await matchDates(value);
            const availableHours = await getAvailableHours(value, bookedHours);
            setAvailableHours(availableHours);
        } else {
            console.log('Date is fully booked');
            setAvailableHours([]);
        }
    
        setLoading(false);
    };

    return (
        <div className="w-full h-full px-[10%] pt-32 mb-16 font-manrope">
            <div className="mb-8 ml-8">
                <p className="text-4xl font-medium mb-3">Свободни часове - {standardizeDate(selectedDate)}</p>
                <div className="w-full h-1 bg-gray-100 rounded-xl"></div>
            </div>

            <div className="w-full h-78 flex flex-row gap-x-8">
                <Calendar
                    onChange={onChange}
                    value={value}
                    locale={'bg-BG'}
                    tileClassName={({ date, view }) => {
                        if (view === 'month') {
                            if (isDateFullyBooked(date)) {
                                return 'booked-date';
                            }
                            if (isWeekend(date)) {
                                return 'weekend-date'; // Custom class for weekends
                            }
                        }
                        return undefined;
                    }}
                    onClickDay={(value, event) => {

                        setSelectedDate(value);

                        // check if date is fully booked


                        handleDayClicked(value);
                    }}
                />

                {availableHours && availableHours.length > 0 && (
                    <div className="w-88 h-72 border border-gray-400 shadow-lg rounded-2xl p-3">
                        <p className="text-2xl font-medium mb-6 text-center">Свободни часове</p>
                        
                        <ul className="list-disc pl-4 flex flex-col max-h-60 flex-wrap">
                            {availableHours.map((hour, index) => (
                                <li key={index} className="text-lg mb-2">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => handleNavigation(hour)}
                                    >
                                        {hour}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default bookingCalendar;