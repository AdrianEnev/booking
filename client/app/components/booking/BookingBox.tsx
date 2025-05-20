interface BookingBoxProps {
    imgPath: string;
    navigate: any;
    date: string;
    service: string;
    hour: string | undefined;
}

const BookingBox = (
    {imgPath, navigate, date, service, hour}: BookingBoxProps,
) => {
    return (
        <button className='booking-box min-w-76 h-76'
            onClick={() => {
                navigate(`/booking/services/${date}/${hour}/${service}`);
            }}
        >
             <img 
                src={imgPath}
                alt="Slide 1" 
                className='w-full h-full rounded-sm'
            />
        </button>
    );
}

export default BookingBox;