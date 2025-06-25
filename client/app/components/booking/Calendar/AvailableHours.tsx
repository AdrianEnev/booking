function AvailableHour({
    index, hour, numberOfHours, setSelectedHour
}: any) {
    return (
        <button 
            key={index} 
            className={`flex py-2 px-3
                text-black text-lg font-medium ${numberOfHours <= 9 ? 'w-1/4 md:w-1/5' : 'w-1/6 md:w-1/7'} 
                border border-gray-100 items-center justify-center
                bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer
            `}
            onClick={() => {
                setSelectedHour(hour);
            }}
        >
            {hour}
        </button>
    )
}

export default AvailableHour