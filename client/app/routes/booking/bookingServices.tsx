import BookingBox from '@components/booking/BookingBox';
import { useNavigate, useParams } from 'react-router';
import { standardizeDate } from '~/use/credentials/useStandardizeDate';

const bookingServices = () => {

    const navigate = useNavigate();
    const { date, hour } = useParams<{ date: string, hour: string }>();
    const formattedDate = date ?? ''; // Provide a default value if date is undefined (otherwise typescript throws error)
    const standardizedDate = standardizeDate(date ?? '')

    return (
        <div className="w-full h-full px-[10%] pt-32 mb-16 font-manrope">
            
            <div className='mb-8 ml-8'>
                <p className='text-4xl font-medium mb-3'>Услуги</p>
                <p className='text-xl text-gray-500 mb-3'>{standardizedDate} - {hour}ч.</p>
                <div className='w-full h-1 bg-gray-100 rounded-xl'></div>
            </div>
            
            <div className='flex flex-row flex-wrap gap-x-3 gap-y-3 justify-center'>
                <BookingBox 
                    imgPath='../../../assets/short_hair_square.jpg'
                    navigate={navigate}
                    date={formattedDate}
                    hour={hour}
                    service={'short_hair'}
                />
                <p>short hair</p>

                <BookingBox 
                    imgPath='../../../assets/design_studio_square.jpg'
                    navigate={navigate}
                    date={formattedDate}
                    hour={hour}
                    service={'long-hair'}
                />
                <p>long hair</p>

            </div>

        </div>
    )
}

export default bookingServices