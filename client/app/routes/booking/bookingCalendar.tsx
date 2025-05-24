import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate, useParams } from 'react-router';
import getAvailableHours from '@use/booking/useGetAvailableHours';
import 'react-calendar/dist/Calendar.css';
import { useGlobalContext } from '@config/GlobalContext';
import { standardizeDate } from '@use/credentials/useStandardizeDate';
import CustomCalendar from '~/components/booking/Calendar/CustomCalendar';

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

const getMonthDays = (value: Date) => {
    const month = value.getMonth();
    const year = value.getFullYear();
    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthDays: number[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
        monthDays.push(day);
    }

    return monthDays;
}

const bookingCalendar = () => {

    const navigate = useNavigate();

    const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
    const [value, onChange] = useState<Value>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [availableHours, setAvailableHours] = useState<string[]>([]);

    // Used to check if a date has been selected so today's date isn't selected by default
    const [initialDateSelected, setInitialDateSelected] = useState(false);
    
    const {loading, setLoading, isAdmin} = useGlobalContext();

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
        setInitialDateSelected(true);
    
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
        <div className={`w-full h-full font-manrope ${isAdmin ? 'px-10 pt-6' : 'px-[9%] pt-10'}`}>
            {/*
                <div className={`${isAdmin ? 'mb-4' : 'mb-8 ml-8'}`}>
                    <p className="text-4xl font-medium mb-3">
                        Свободни часове{initialDateSelected && ` - ${standardizeDate(selectedDate)}`}
                    </p>
                    <div className="w-full h-1 bg-gray-100 rounded-xl"></div>
                </div>
            */}

            <CustomCalendar 
                onChange={onChange}
                value={value}
                onClickDay={(value, event) => {
                    setSelectedDate(value);
                    handleDayClicked(value);
                }}
                monthDays={getMonthDays(value as Date)}
            />
        </div>
    );
};

export default bookingCalendar;