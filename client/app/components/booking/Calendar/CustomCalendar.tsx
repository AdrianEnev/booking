import WeekDay from './WeekDay';
import MonthDay from './MonthDay';
import getMonthDays from '~/use/booking/get/getMonthDays';

interface CustomCalendarProps {
    selectedDate: Date,
    setSelectedDate: (date: Date) => void,
    setInitialDateSelected: (isSelected: boolean) => void
    navigate: any,
    bookedDays: any;
}

function CustomCalendar({ 
    selectedDate, setSelectedDate, setInitialDateSelected, navigate, bookedDays
}: CustomCalendarProps) {

    const weekDays = ['Пон', 'Вто', 'Сря', 'Чет', 'Пет', 'Съб', 'Нед'];
    const monthDays = getMonthDays(selectedDate);

    const simplifyDate = (value: Date) => {
        const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
        const formattedDate = value.toLocaleDateString('bg-BG', options);
        return formattedDate.replace(' г.', '').replace(/^./, (char) => char.toUpperCase());
    };

    const incrementMonth = (date: Date) => {
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 1);
        if (
            date.getFullYear() < maxDate.getFullYear() || 
            (date.getFullYear() === maxDate.getFullYear() && date.getMonth() < maxDate.getMonth())
        ) {
            const newDate = new Date(date);
            newDate.setMonth(newDate.getMonth() + 1);
            setSelectedDate(newDate);
        }
    };

    const decrementMonth = (date: Date) => {
        const currentDate = new Date();
        if (
            date.getFullYear() > currentDate.getFullYear() || 
            (date.getFullYear() === currentDate.getFullYear() && date.getMonth() > currentDate.getMonth())
        ) {
            const newDate = new Date(date);
            newDate.setMonth(newDate.getMonth() - 1);
            setSelectedDate(newDate);
        }
    };

    // Calculate the day of the week for the 1st day of the month
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Adjust for Monday as the first day of the week

    // Used to calculate appropriate height for each box
    const totalBoxes = firstDayIndex + monthDays.length;

    return (
        <div
            className='w-full h-[55%] md:h-[95%] bg-white rounded-xl shadow-lg border border-gray-300 font-manrope'
        >
            {/* Header */}
            <div className='w-full h-[16%] md:h-[8%] bg-[#f8f8f8] rounded-x-xl rounded-t-xl border-b border-gray-300'>
                <div className='flex w-full h-full items-center justify-between pr-3 md:pr-6'>
                    <div className='flex flex-row items-center h-full w-[80%] gap-x-2 sm:gap-x-4 md:gap-x-6'>
                        <button className='w-16 h-full mt-[-4px] border-r border-gray-300
                            hover:opacity-40 transition-colors duration-200 cursor-pointer
                        '
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            <p className='text-4xl text-[#4a6fa5]'>{'<'}</p>
                        </button>
                        <p className='text-sm 3xs:text-base md:text-lg lg:text-2xl font-semibold text-[#403f3f] w-1/2'>
                            {simplifyDate(selectedDate)}
                        </p>
                    </div>

                    <div className='flex flex-row gap-x-5 w-[30%] sm:w-[20%] md:w-[15%] h-[65%] sm:h-[55%] md:h-[50%]'>
                        <div className='flex flex-row items-center justify-between w-full h-full bg-white shadow-md rounded-lg border border-gray-300 text-black'>
                            <button className='w-1/4 h-full rounded-l-lg rounded-y-lg hover:bg-gray-200 active:opacity-40'
                                onClick={() => decrementMonth(selectedDate)}
                            >
                                <p className='text-[#4a6fa5]'>{'<'}</p>
                            </button>

                            <p className='text-sm md:text-base font-medium'>Месец</p>

                            <button className='w-1/4 h-full rounded-r-lg rounded-y-lg hover:bg-gray-200 active:opacity-40'
                                onClick={() => incrementMonth(selectedDate)}
                            >
                                <p className='text-[#4a6fa5]'>{'>'}</p>
                            </button>
                        </div> 
                    </div>
                </div>
            </div>

            {/* Week Days */}
            <div className='w-full h-[12%] md:h-[6%] bg-white rounded-x-xl border-b border-gray-300 flex flex-row justify-between'>
                {weekDays.map((day, index) => (
                    <WeekDay key={index} index={index + 1} day={day} />
                ))} 
            </div>

            {/* Month Days */}
            <div className='w-full h-[86%] bg-white rounded-x-xl rounded-b-xl flex flex-row flex-wrap'>

                {/* Render empty gray boxes for days before the 1st day of the month */}
                {Array.from({ length: firstDayIndex }).map((_, index) => (
                    <div 
                        key={`empty-${index}`} 
                        className={`${totalBoxes > 35 ? 'h-1/6' : 'h-1/5'} w-1/7  bg-[#f8f8f8]`}
                    />
                ))}

                {/* Render actual days of the month */}
                {monthDays.map((day, index) => (
                    <MonthDay 
                        key={index} 
                        index={index + 1} 
                        day={day} // number from 1 to 31
                        numberOfDays={totalBoxes} // total number of boxes in the month
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setInitialDateSelected={setInitialDateSelected}
                        bookedDays={bookedDays}
                    />
                ))} 
            </div>
        </div>
    );
}

export default CustomCalendar;