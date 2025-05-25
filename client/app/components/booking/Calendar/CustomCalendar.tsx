import WeekDay from './WeekDay';
import MonthDay from './MonthDay';
import getMonthDays from '~/use/booking/get/getMonthDays';

interface CustomCalendarProps {
    selectedDate: Date,
    setSelectedDate: (date: Date) => void,
    setInitialDateSelected: (isSelected: boolean) => void
    navigate: any
}

/*
<p>Selected Date: {value.toDateString()}</p>
<button onClick={() => onChange(new Date())}>Change Date</button>
 */
 
//hover:bg-gray-50 transition-colors duration-200 cursor-pointer
//onClick={(event) => onClickDay(value, event)}

function CustomCalendar({ 
    selectedDate, setSelectedDate, setInitialDateSelected, navigate
}: CustomCalendarProps) {

    const weekDays = ['Пон', 'Вто', 'Сря', 'Чет', 'Пет', 'Съб', 'Нед'];
    const monthDays = getMonthDays(selectedDate)

    const simplifyDate = (value: Date) => {
        // Returns month and year in the format "Май 2025"
        const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
        const formattedDate = value.toLocaleDateString('bg-BG', options);
        return formattedDate.replace(' г.', '').replace(/^./, (char) => char.toUpperCase());
    }

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
    }

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
    }

    return (
        <div
            className='w-full h-[93%] bg-white rounded-xl shadow-lg border border-gray-300 font-manrope'
        >
            {/* Header */}
            <div className='w-full h-[8%] bg-[#f8f8f8] rounded-x-xl rounded-t-xl border-b border-gray-300'>
                <div className='flex w-full h-full items-center justify-between pr-6'>
                    <div className='flex flex-row items-center h-full w-[80%] gap-x-6'>
                        <button className='w-16 h-full mt-[-4px] border-r border-gray-300
                            hover:opacity-40 transition-colors duration-200 cursor-pointer
                        '
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            <p className='text-4xl text-[#4a6fa5]'>{'<'}</p>
                        </button>
                        <p className='text-2xl font-semibold text-[#403f3f] w-1/2'>
                            {simplifyDate(selectedDate)}
                        </p>
                    </div>

                    <div className='flex flex-row gap-x-5 w-[10%] h-[50%]'>
                        <div className='flex flex-row items-center justify-between w-full h-full bg-white shadow-md rounded-lg border border-gray-300 text-black'>
                            <button className='w-1/4 h-full rounded-l-lg rounded-y-lg hover:bg-gray-200 active:opacity-40'
                                onClick={() => decrementMonth(selectedDate)}
                            >
                                <p className='text-[#4a6fa5]'>{'<'}</p>
                            </button>

                            <p className='text-md font-medium'>Месец</p>

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
            <div className='w-full h-[6%] bg-white rounded-x-xl border-b border-gray-300 flex flex-row justify-between'>
                {weekDays.map((day, index) => (
                    <WeekDay key={index} index={index + 1} day={day} />
                ))} 
            </div>

            {/* Month Days */}
            <div className='w-full h-[86%] bg-white rounded-x-xl rounded-b-xl flex flex-row flex-wrap'>
                {monthDays.map((day, index) => (
                    <MonthDay 
                        key={index} 
                        index={index + 1} 
                        day={day} // number from 1 to 31
                        numberOfDays={monthDays.length}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setInitialDateSelected={setInitialDateSelected}
                    />
                ))} 
            </div>
        </div>
    );
}

export default CustomCalendar;