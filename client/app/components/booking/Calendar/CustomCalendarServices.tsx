import { standardizeDate } from '~/use/credentials/useStandardizeDate';
import ServicesComponents from './ServicesComponents';

interface CustomCalendarServicesProps {
    selectedDate: Date,
    selectedHour: string;
    setSelectedHour: (hour: string) => void;
    setSelectedService: (service: string) => void;
}

function CustomCalendarServices({
    selectedDate, selectedHour, setSelectedHour, setSelectedService
}: CustomCalendarServicesProps) {
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
                        setSelectedHour('')
                    }}
                >
                    <p className='text-4xl text-[#4a6fa5]'>{'<'}</p>
                </button>
                
                <div className='flex flex-row w-1/4 h-full items-center gap-x-3'>
                    <p className='text-2xl font-semibold text-[#403f3f] w-1/2 border-r border-gray-300'>
                        {standardizeDate(selectedDate)}
                    </p>

                    <p className='text-2xl font-semibold text-[#403f3f] w-1/2'>
                        {selectedHour}
                    </p>
                </div>
            </div>
            
            <div className='w-full h-[92%] flex justify-center'>
                <ServicesComponents setSelectedService={setSelectedService}/>
            </div>
        </div>
    );
}

export default CustomCalendarServices