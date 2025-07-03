import { standardizeDate } from '~/use/credentials/useStandardizeDate';
import ServicesComponents from './ServicesComponents';
import { motion } from 'framer-motion';

interface CustomCalendarServicesProps {
    selectedDate: Date,
    selectedHour: string;
    setSelectedHour: (hour: string) => void;
    setSelectedService: (service: string) => void;
    dimensions?: {
        width: number;
        height: number;
    };
    customCalendarServicesAnimationRan?: boolean;
    setCustomCalendarServicesAnimationRan?: (ran: boolean) => void;
}

function CustomCalendarServices({
    selectedDate, selectedHour, setSelectedHour, setSelectedService, dimensions,
    customCalendarServicesAnimationRan, setCustomCalendarServicesAnimationRan
}: CustomCalendarServicesProps) {
    return (
        <motion.div
            className='w-full h-[95%] bg-white rounded-xl shadow-lg border border-gray-300 font-manrope'
            initial={customCalendarServicesAnimationRan ? {} : { scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
                if (!customCalendarServicesAnimationRan && setCustomCalendarServicesAnimationRan) {
                    setCustomCalendarServicesAnimationRan(true);
                }
            }}
        >
            {/* Header */}
            <div className='w-full h-[8%] bg-[#f8f8f8] rounded-x-xl rounded-t-xl border-b border-gray-300 flex flex-row items-center gap-x-6'>
                <button className='w-16 h-full border-r border-gray-300 mt-[-4px]
                    hover:opacity-40 transition-colors duration-200 cursor-pointer
                '
                    onClick={() => {
                        setSelectedHour('')
                        setCustomCalendarServicesAnimationRan!(false);
                    }}
                >
                    <p className='text-4xl text-[#4a6fa5]'>{'<'}</p>
                </button>
                
                <div className='flex flex-row w-full md:w-1/2 h-full items-center gap-x-3'>
                    <p className='text-sm 3xs:text-base md:text-2xl font-semibold text-[#403f3f] min-w-1/2 border-r border-gray-300'>
                        {standardizeDate(selectedDate)}
                    </p>

                    <p className='text-sm 3xs:text-base md:text-2xl font-semibold text-[#403f3f] min-w-1/2'>
                        {selectedHour}
                    </p>
                </div>
            </div>
            
            <div className='w-full h-[92%] flex justify-center'>
                <ServicesComponents setSelectedService={setSelectedService} dimensions={dimensions}/>
            </div>
        </motion.div>
    );
}

export default CustomCalendarServices