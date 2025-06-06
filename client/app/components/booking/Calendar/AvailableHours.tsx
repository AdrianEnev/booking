function AvailableHour({
    index, hour, setSelectedHour
}: any) {

    return (
        <button 
            key={index} 
            className={`flex py-4 px-5
                text-black text-lg font-medium w-1/7
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