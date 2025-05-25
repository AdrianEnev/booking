import { standardizeDate } from '~/use/credentials/useStandardizeDate';
import AvailableHour from './AvailableHours';

interface CustomCalendarHoursProps {
    selectedDate: Date,
    setInitialDateSelected: (isSelected: boolean) => void
    availableHours: string[];
    setSelectedHour?: (hour: string) => void;
}

function CustomCalendarHours({
    selectedDate, setInitialDateSelected, availableHours, setSelectedHour
}: CustomCalendarHoursProps) {
    return (
        <div
            className='w-full h-[93%] bg-white rounded-xl shadow-lg border border-gray-300 font-manrope'
        >
            {/* Header */}
            <div className='w-full h-[8%] bg-[#f8f8f8] rounded-x-xl rounded-t-xl border-b border-gray-300 flex flex-row items-center gap-x-6'>
                <button className='w-16 h-full border-r border-gray-300 mt-[-4px]
                    hover:opacity-40 transition-colors duration-200 cursor-pointer
                '
                    onClick={() => {
                        setInitialDateSelected(false)
                    }}
                >
                    <p className='text-4xl text-[#4a6fa5]'>{'<'}</p>
                </button>

                <p className='text-2xl font-semibold text-[#403f3f] w-1/2'>
                    {standardizeDate(selectedDate)}
                </p>
            </div>

            <div className='w-full h-[92%] bg-white rounded-x-xl rounded-b-xl flex flex-row flex-wrap'>
                {availableHours.map((hour, index) => (
                    <AvailableHour 
                        key={index} 
                        index={index + 1} 
                        hour={hour}
                        setSelectedHour={setSelectedHour}
                    />
                ))} 
            </div>

        </div>
    );
}

export default CustomCalendarHours